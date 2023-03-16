const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotify = require('.././songdata0.json');

function formatMilliseconds(milliseconds) {
  if (!milliseconds) return 'no wert bruder'
  let seconds = Math.floor(milliseconds / 1000) % 60
  let minutes = Math.floor(milliseconds / 60000)
  return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
}

module.exports = {
  description: 'Give information about song with specific number',
  type: CommandType.LEGACY,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<songarray-number>",
  ownerOnly: true,
    callback: ({ args, message, channel }) => {
    const songnubmer = args[0];
    console.log(songnubmer);
    if (!songnubmer) return 'Please provide a song number';
    if (isNaN(songnubmer)) return 'Please provide a valid number';
    if (songnubmer < 0) return 'Fick Dich xD';
    if (songnubmer > spotify.length) return 'geh dich löschen';
    const embed = new EmbedBuilder()
    .setTitle(`Required Song ${songnubmer}`)
    .setColor('#ff00ff')
    .addFields(
      {
        name: "Streaming Zeitpunkt",
        value: spotify[songnubmer].ts,
        //inline: true
      },
      {
        name: "Nutzer",
        value: spotify[songnubmer].username,
        //inline: true
      },
      {
        name: "Gestreamet über",
        value: spotify[songnubmer].platform,
        //inline: true
      },
      {
        name: "Time Played",
        value: formatMilliseconds(spotify[songnubmer].ms_played )+ " min",
        //inline:true
      },
      {
        name: "Genutzete IP",
        value: spotify[songnubmer].ip_addr_decrypted,
        //inline: true
      },
      {
        name: "Song",
        value: spotify[songnubmer].master_metadata_track_name,
        //inline: true
      },
      {
        name: "Künstler",
        value: spotify[songnubmer].master_metadata_album_artist_name,
        //inline: true
      },
      {
        name: "Album",
        value: spotify[songnubmer].master_metadata_album_album_name,
        //inline: true
      },
      {
        name: "Startgrund",
        value: spotify[songnubmer].reason_start,
        //inline: true 
      },
      {
        name: "Endgrund",
        value: spotify[songnubmer].reason_end,
        //inline: true
      },
      {
        name: "Shuffle",
        value: spotify[songnubmer].shuffle.toString(),
        //inline: true
      },
      {
        name: "Offline-Stream",
        value: spotify[songnubmer].offline.toString(),
        //inline: true
      }

    );
    message.channel.send({embeds: [embed]});
    },
  };
  