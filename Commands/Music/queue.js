const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows current play list."),

  async execute(interaction, client) {
    const { guild } = interaction;
    let userId = interaction.user.id;
    let currentUser = guild.members.cache.get(userId);
    let voiceChannel = currentUser.voice.channel;
    const queue = await client.distube.getQueue(voiceChannel);

    if (queue.song == 1)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#00ff00")
            .setDescription("There is no next position in queue."),
        ],
      });

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#9B07D8")
          .setDescription(
            `${queue.songs.map(
              (song, id) =>
                `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )}`
          ),
      ],
    });
  },
};
