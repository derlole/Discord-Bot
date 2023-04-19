const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');

module.exports = {
  description: 'Give information about song with specific number',
  type: CommandType.LEGACY,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<songarray-number>",
  ownerOnly: true,
    callback: ({ args, message, channel, guild }) => {

            //user definition
            if (message.author.id === '738480351046795305') {
              const spotifyEins = require('../../nicasongs0.json');
              const spotifyZwei = require('../../nicasongs1.json');
              const spotifyDrei = require('../../nicasongs2.json');
              const spotifyVier = require('../../nicasongs3.json');
              var spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
          }
          if (message.author.id === '702427586822930493') {
              const spotifyEins = require('../../songdata0.json')
              const spotifyZwei = require('../../songdata1.json')
              const spotifyDrei = require('../../songdata2.json')
              const spotifyVier = require('../../songdata3.json');
              var spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
          }
          console.log(spotify.length)
          //functions
function formatMilliseconds(milliseconds) {
  if (!milliseconds) return 'no wert bruder'
  let seconds = Math.floor(milliseconds / 1000) % 60
  let minutes = Math.floor(milliseconds / 60000)
  return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
}
//rest
      const server ='1089153627643449436'
      if(guild.id !== server && message.author.id !== '702427586822930493') return channel.send('This command is not available here')
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
      },
      {
        name: "Nutzer",
        value: spotify[songnubmer].username,
      },
      {
        name: "Gestreamet über",
        value: spotify[songnubmer].platform,
      },
      {
        name: "Time Played",
        value: formatMilliseconds(spotify[songnubmer].ms_played )+ " min"
      },
      {
        name: "Genutzete IP",
        value: spotify[songnubmer].ip_addr_decrypted,
      },
      {
        name: "Song",
        value: spotify[songnubmer].master_metadata_track_name,
      },
      {
        name: "Künstler",
        value: spotify[songnubmer].master_metadata_album_artist_name,
      },
      {
        name: "Album",
        value: spotify[songnubmer].master_metadata_album_album_name,
      },
      {
        name: "Startgrund",
        value: spotify[songnubmer].reason_start, 
      },
      {
        name: "Endgrund",
        value: spotify[songnubmer].reason_end,
      },
      {
        name: "Shuffle",
        value: spotify[songnubmer].shuffle.toString(),
      },
      {
        name: "Offline-Stream",
        value: spotify[songnubmer].offline.toString(),
      }

    );
    message.channel.send({embeds: [embed]});
    },
  };
  