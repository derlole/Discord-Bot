const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../songdata0.json')
const spotifyZwei = require('../songdata1.json')
const spotifyDrei = require('../songdata2.json')
const spotifyVier = require('../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
/*function formatMilliseconds(milliseconds) {
  if (!milliseconds) return 'no wert bruder'
  let seconds = Math.floor(milliseconds / 1000) % 60
  let minutes = Math.floor(milliseconds / 60000)
  return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`
}*/

module.exports = {
  description: 'Give Total Play time up to an specific song',
  type: CommandType.LEGACY,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<songarray-number>",
  ownerOnly: true,
    callback: ({ args, message, channel }) => {
    
    var songnumber = 0;
    const track = args[0];
    let time = 0;
    //if (!songnumber) return 'Please provide a song number';
    if (isNaN(songnumber)) return 'Please to be not an idiot';
    if (songnumber < 0) return 'Please provide to be not an idiot';
    if (songnumber > spotify.length - 1) return 'Please provide a valid number for the songs';
    const intervalId = setInterval(() => {
        if (track > songnumber) {
            time = time + spotify[songnumber].ms_played
            songnumber++
            console.log(time)
        } else {
        clearInterval(intervalId);
        
    }
    },1);
    const embed = new EmbedBuilder()
        .setTitle(`Playtime`)
        .addFields(
            {
                name: "Total Playtime",
                value: `Zeit: ${time.toString()} ms`,
            }
        )
        .setColor('#ff00ff')
        message.channel.send({embeds: [embed]});
    }
}
