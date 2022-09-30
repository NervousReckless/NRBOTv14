const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggle autoplay On/Off"),

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

    const autoplay = queue.toggleAutoplay();
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(`Autoplay: \`${autoplay ? "On" : "Off"}\``),
      ],
    });
  },
};
