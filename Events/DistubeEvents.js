// const { loadEvents } = require("../Handlers/eventHandler")
const { client, player } = require("../index");
const { EmbedBuilder } = require("discord.js");

// const player = new WebhookClient({
//   id: "1025432178844258476",
//   token: "pFV71t92PTMLo9mmK-EbXsD3ud7UNWeXbPKVem4PZTXtd1LXIwcvp9w7hsdeRfyXtYm9",
// });

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.names.join(", ") || "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (queue, song) =>
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle("🎶 Playing 🎶")
          .addFields({ name: "Name", value: `${song.name}` })
          .addFields(
            {
              name: "Duration",
              value: `${song.formattedDuration}`,
              inline: true,
            },
            { name: "Volume", value: `${queue.volume}`, inline: true },
            {
              name: "Autoplay",
              value: `${queue.autoplay ? "On" : "Off"}`,
              inline: true,
            },
            { name: "Requested by", value: `${song.user}` }
          ),
      ],
    })
  )

  .on("addSong", (queue, song) =>
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle("▶️ Added to queue")
          .setDescription(`${song.name} - \`${song.formattedDuration}\``)
          .addFields({ name: "Requested by", value: `${song.user}` }),
      ],
    })
  )

  .on("addList", (queue, playlist) =>
    player.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(
            `🔼  Added \`${playlist.name}\` playlist (${
              playlist.songs.length
            } songs) to queue\n${status(queue)}`
          ),
      ],
    })
  )

  .on("error", (channel, e) => {
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(
            `An error encountered: ${e.toString().slice(0, 1974)}`
          ),
      ],
    });

    console.error(e);
  })

  .on("empty", (channel) =>
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription("Voice channel is empty! Leaving the channel..."),
      ],
    })
  )

  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#00ff00")
          .setDescription(`| No result found for \`${query}\`!`),
      ],
    })
  )

  .on("finish", (queue) =>
    player.send({
      embeds: [
        new EmbedBuilder().setColor("#00ff00").setDescription("Finished!"),
      ],
    })
  );
