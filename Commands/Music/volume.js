const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change volume.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Provide a number.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild } = interaction;
    let userId = interaction.user.id;
    let currentUser = guild.members.cache.get(userId);
    let voiceChannel = currentUser.voice.channel;

    const queue = await client.distube.getQueue(voiceChannel);

    var volume = parseInt(options.getString("query"));

    if (volume > 100) volume = 100;

    if (!queue)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#00ff00")
            .setDescription("There is no queue."),
        ],
      });

    if (isNaN(volume))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#00ff00")
            .setDescription("Please select a correct number"),
        ],
      });

    await queue.setVolume(volume, options.getString("query"));
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(`Volume has been changed to ${volume}%`),
      ],
    });
  },
};
