const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music on voice channel.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Provide name or url.")
        .setRequired(true)
    ),

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

    // if (
    //   guild.me.voice.channelId &&
    //   voiceChannel.id !== guild.me.voice.channelId
    // )
    //   return interaction.reply({
    //     content: "I'm already playing music on this channel.",
    //     ephemeral: true,
    //   });
    let query = interaction.options.getString("query");

    try {
      client.distube.play(voiceChannel, query, {
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
    } catch (e) {
      const errorEmbed = new EmbedBuilder()
        .setColor("BLUE")
        .setDescription(`Alert: ${e}`);
      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
