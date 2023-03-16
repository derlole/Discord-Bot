const spotify = require('../.././songdata0.json')
const { EmbedBuilder } = require('discord.js');
module.exports = (message, instance) => {
  
  
  
  if (message.content === "Zeit" && message.channel.id ==='1079807642639290510') {
    let index = 0;
   const intervalId = setInterval(() => {
      if (index < 3) {
      const embed = new EmbedBuilder()
        .setTitle(`Song ${index}`)
        .addFields(
          {
            name: "Time",
            value: spotify[index].ms_played /60000 +"min"
          },
          {
            name: "Song",
            value: spotify[index].master_metadata_track_name,
            inline: true
          },
          {
            name: "Genutzete IP",
            value: spotify[index].ip_addr_decrypted,
            inline: true
          }
        )
      message.channel.send({embeds: [embed]});
      index++;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    
  } 
}