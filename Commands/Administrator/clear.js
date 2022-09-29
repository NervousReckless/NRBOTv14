const {
  EmbedBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deletes specified number of message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Select the amount of messages to delete.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select user that messages you want to delete.")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;
    const amount = options.getInteger("amount");
    const target = options.getUser("target");
    const messages = await channel.messages.fetch({
      limit: amount + 10,
    });
    const response = new EmbedBuilder().setColor("LuminousVividPink");

    if (amount > 100 || amount <= 0) {
      response.setDescription("Amount cannot be under 1 or exceed 100.");
      return interaction.reply({ embeds: [response] });
    }

    if (target) {
      let i = 0;
      const filtered = [];

      messages.filter((m) => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });

      await channel.bulkDelete(filtered).then((messages) => {
        response.setDescription(`Cleared ${messages.size} from ${target}`);
        interaction
          .reply({ embeds: [response] })
          .then(() => this.delay(5000))
          .then(() => interaction.deleteReply());
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        response.setDescription(`Cleared ${messages.size} from this channel`);
        interaction
          .reply({ embeds: [response] })
          .then(() => this.delay(5000))
          .then(() => interaction.deleteReply());
      });
    }
  },

  delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  },
};
