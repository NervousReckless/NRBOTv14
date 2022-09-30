const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { player } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops a song."),

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

    await queue.stop(voiceChannel);
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription("Music has been stopped."),
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
