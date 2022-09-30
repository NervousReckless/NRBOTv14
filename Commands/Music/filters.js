const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { player } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("filters")
    .setDescription("Set filter for currently playing song")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select a filter.")
        .addChoices(
          { name: "bassboost", value: "bassboost" },
          { name: "nightcore", value: "nightcore" },
          { name: "3d", value: "3d" },
          { name: "echo", value: "echo" },
          { name: "vaporwave", value: "vaporwave" },
          { name: "flanger", value: "flanger" },
          { name: "gate", value: "gate" },
          { name: "haas", value: "haas" },
          { name: "reverse", value: "reverse" },
          { name: "surround", value: "surround" },
          { name: "mcompand", value: "mcompand" },
          { name: "phaser", value: "phaser" },
          { name: "tremolo", value: "tremolo" },
          { name: "earwax", value: "earwax" },
          { name: "off", value: "off" }
        )
    ),

  async execute(interaction, client) {
    const { guild } = interaction;
    let userId = interaction.user.id;
    let currentUser = guild.members.cache.get(userId);
    let voiceChannel = currentUser.voice.channel;

    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#00ff00")
            .setDescription("There is no queue."),
        ],
      });

    const filter = interaction.options.getString("type");

    if (filter === "off" && queue.filters.size) queue.filters.clear();
    else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter);
      else queue.filters.add(filter);
    }
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(
            `Current filter: \`${queue.filters.names.join(", ") || "Off"}\``
          ),
      ],
    });
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle("Request recived")
          .setDescription(
            `For music notification check <#1025431924426153995>`
          ),
      ],
    });
  },
};
