const spotify = require('../.././songdata0.json')
const { EmbedBuilder } = require('discord.js');
module.exports = (message, instance) => {
  
  
  
  if (message.content === "Zeit" && message.channel.id ==='1079807642639290510') {
    console.log("geht so far")
    let index = 0;
   const intervalId = setInterval(() => {
      if (index < 1) {
      const embed = new EmbedBuilder()
        .setTitle(`Song ${index}`)
        .addFields(
          {
            name: "Time",
            value: spotify[index].ms_played.toString()
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