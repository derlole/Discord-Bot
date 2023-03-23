const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../songdata0.json')
const spotifyZwei = require('../songdata1.json')
const spotifyDrei = require('../songdata2.json')
const spotifyVier = require('../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<artist-name>",
    ownerOnly: true,
    callback: () => {

          const songs = {}; 
          let shuffleCount = 0;

spotify.forEach(song => {
  const name = song.master_metadata_track_name;
  if (songs[name]) {
    songs[name].ms_played += song.ms_played;
    songs[name].reason_start.push(song.reason_start);
    songs[name].reason_end.push(song.reason_end);
    if(song.shuffle) {
      shuffleCount++;
    }
   
  } else {
    songs[name] = {
      ms_played: song.ms_played,
      reason_start: [song.reason_start],
      reason_end: [song.reason_end],
      shuffle: song.shuffle 
    }
    if(song.shuffle) {
      shuffleCount++;
    }
  }
});

console.log(songs); 
console.log('shuffleCount:' + shuffleCount);
    }
}
