const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your commands/events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Reload your events.")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Reload your Commands.")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const addSubcommand = interaction.options.getSubcommand();

    switch (addSubcommand) {
      case "event":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ content: "Reloaded events", ephemeral: true });
        }
        break;
      case "command":
        {
          loadCommands(client);
          interaction.reply({ content: "Reloaded commands", ephemeral: true });
        }
        break;
    }
  },
};
