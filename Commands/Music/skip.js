const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { player } = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips currently playing song."),

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

    if (queue.song == 1)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#00ff00")
            .setDescription("There is no next position in queue."),
        ],
      });

    await queue.skip(voiceChannel);
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription("Song has been skipped."),
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
