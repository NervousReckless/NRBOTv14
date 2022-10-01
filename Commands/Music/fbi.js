const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: DisTube } = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fbi")
    .setDescription("Plays fbi meme song on voice channel."),

  async execute(interaction, client) {
    const { member, guild, channel } = interaction;
    let userId = interaction.user.id;
    let currentUser = guild.members.cache.get(userId);
    let voiceChannel = currentUser.voice.channel;

    if (!voiceChannel)
      return interaction.reply({
        content: "You must be on voice channel to use this command.",
        ephemeral: true,
      });

    const fbi = "https://www.youtube.com/watch?v=KQXzXyuRtQA";

    await client.distube.play(voiceChannel, fbi, {
      textChannel: channel,
      member: member,
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
