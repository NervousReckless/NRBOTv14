const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // console.log("I'm working..");

    loadCommands(client);
  },
};
