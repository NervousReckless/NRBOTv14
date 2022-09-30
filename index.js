const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  DirectMessages,
  GuildVoiceStates,
  MessageContent,
} = GatewayIntentBits;
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;
require("dotenv").config();

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    DirectMessages,
    GuildVoiceStates,
    MessageContent,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emitAddListWhenCreatingQueue: false,
  plugins: [new YtDlpPlugin({ update: true })],
});

loadEvents(client);
module.exports = { client };

client.login(process.env.TOKEN);
