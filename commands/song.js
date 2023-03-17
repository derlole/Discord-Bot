const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('.././songdata0.json')
const spotifyZwei = require('.././songdata1.json')
const spotifyDrei = require('.././songdata2.json')
const spotifyVier = require('.././songdata3.json')
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier)
console.log(spotify.length)
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
    if (isNaN(songnubmer)) return 'Please to be not an idiot';
    if (songnubmer < 0) return 'Please provide to be not an idiot';
    if (songnubmer > spotify.length - 1) return 'Please provide a valid number for the songs';
    //if(!Number.isInteger(songnubmer)) return 'jetz halts maul du Wixer';
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
  