const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Create a suggestion.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select the type.")
        .setRequired(true)
        .addChoices(
          { name: "Vote", value: "Vote" },
          { name: "Event", value: "Event" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Provide a name for your Vote.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe your vote.")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;
    const type = options.getString("type");
    const name = options.getString("name");
    const desc = options.getString("description");

    const response = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(`${interaction.member} has suggested a ${type}.`)
      .addFields(
        { name: `Name:`, value: `${name}` },
        { name: `Description:`, value: `${desc}` }
      );
    const message = await interaction.reply({
      embeds: [response],
      fetchReply: true,
    });
    message.react("✅");
    message.react("❌");
  },
};
