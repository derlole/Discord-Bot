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
    expectedArgs: "",
    ownerOnly: true,
    callback: (channel) => {
          const songs = {}; 
spotify.forEach(song => { 
  const name = song.master_metadata_track_name;
  if (songs[name]) {
    songs[name].played++;
    songs[name].ms_played += song.ms_played;
    //songs[name].reason_start.push(song.reason_start);
    //songs[name].reason_end.push(song.reason_end);
    if(song.shuffle) songs[name].shuffle++
    if(song.offline) songs[name].offline++
    if(song.skipped) songs[name].skipped++
   
  } else {
    songs[name] = {
      played: 1,
      ms_played: song.ms_played,
      //reason_start: [song.reason_start],
      //reason_end: [song.reason_end],
      shuffle: song.shuffle ? 1 : 0,
      offline: song.offline ? 1 : 0,
      skipped: song.skipped ? 1 : 0,
    }
  }
});
for(const songName in songs){
  const song = songs[songName];
  const embed = new EmbedBuilder()
  .setTitle(`Statistics of ${songName}`) 
  .addFields(
      {
          name: "Number of Plays:",
          value: song.played.toString(),
      },
      {
          name: "Number of Skips:",
          value: `${song.skipped} (${(song.skipped / song.played * 100).toFixed(2)}%)`,
      },
      { 
          name: "Number of Listned through:",
          value: (song.played - song.skipped).toString(),
      },
      {
          name: "Number of 0 seconds Listening:",
          value: (song.played - song.ms_played).toString(),
      },
      {
          name: "Number of Shuffle Plays:",
          value: `${song.shuffle} (${(song.shuffle / song.played * 100).toFixed(2)}%)`,
      },
      {
          name: "Number of Offline Plays:",
          value: `${song.offline} (${(song.offline / song.played * 100).toFixed(2)}%)`,
      },
  )
  .setTimestamp()
  .setColor('#00FF00')
}
console.log(songs); 

    }  
}
