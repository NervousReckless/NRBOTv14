const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Request random meme.")
    .addStringOption((option) =>
      option.setName("subreddit").setDescription("Provide subreddit.")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const subreddit = interaction.options.getString("subreddit") || "";
    const embed = new EmbedBuilder().setColor("Red");
    const reactions = ["😂", "🤨"];

    try {
      const response = await axios.get(
        `https://meme-api.herokuapp.com/gimme/${encodeURIComponent(subreddit)}`
      );

      if (response.data.nsfw && !interaction.channel.nsfw) {
        embed
          .setTitle("NSFW Content")
          .setDescription("Age-Restricted content is not allowed.");
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      embed
        .setColor("Random")
        .setDescription(
          `by ${response.data.author} in [r.${response.data.subreddit}](https://reddit.com/r/${response.data.subreddit})`
        )
        .setTitle(response.data.title)
        .setImage(response.data.url)
        .setURL(response.data.postLink)
        .setFooter({ text: `${response.data.ups} upvotes` });

      const reply = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      });
      reactions.forEach((reaction) => reply.react(reaction).catch(() => {}));
    } catch (error) {
      embed
        .setTitle("Unable to reach API")
        .setDescription("A connection to the API could not be established.");

      if (error.response?.data?.message)
        embed
          .setTitle("Unable to find content or subreddit")
          .setDescription(error.response.data.message);

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
