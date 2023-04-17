const spotify = require('../.././songdata0.json')
const { EmbedBuilder } = require('discord.js');
module.exports = (message, instance) => {
  
  
  
  if (message.content === "Zeit" && message.channel.id ==='1079807642639290510') {
    let songnubmer = 0;
   const intervalId = setInterval(() => {
      if (songnubmer < 1) {
      const embed = new EmbedBuilder()
        .setTitle(`Song ${songnubmer}`)
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
            value: spotify[songnubmer].ms_played /60000 +"min", //aus millisekunden Zeit in Minuten und Sekunden umrechnen
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
          },
        )
      message.channel.send({embeds: [embed]});
      songnubmer++;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    
  } 
}