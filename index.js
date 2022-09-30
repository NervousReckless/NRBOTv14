const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  WebhookClient,
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

const player = new WebhookClient({
  id: "1025432178844258476",
  token: "pFV71t92PTMLo9mmK-EbXsD3ud7UNWeXbPKVem4PZTXtd1LXIwcvp9w7hsdeRfyXtYm9",
});

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
module.exports = { client, player };

client.login(process.env.TOKEN);
