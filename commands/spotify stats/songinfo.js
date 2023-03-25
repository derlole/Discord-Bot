const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../../songdata0.json')
const spotifyZwei = require('../../songdata1.json')
const spotifyDrei = require('../../songdata2.json')
const spotifyVier = require('../../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

function formatUTCDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    timeZone: 'UTC' 
  };
  return date.toLocaleDateString('de-DE', options);
}
const getData = (songName) => {
  let data = {
    songplayes: 0,
    skipped: 0,
    notSkipped: 0,
    notListened: 0,
    playtime: 0,
    playtime: 0,
    shuffle: 0,
    offline: 0,
    artist: "",
    streamTimes: [],
  }
  spotify.forEach(song => {
    if (song && song.master_metadata_track_name && songName === song.master_metadata_track_name.replace(/\s+/g, "-")) {
      data.songplayes++
      song.skipped ? data.skipped++ : data.notSkipped++
      if (song.ms_played === 0) data.notListened++
      if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
      if (song.offline) data.offline++
      if (song.shuffle) data.shuffle++
      data.artist = song.master_metadata_album_artist_name
      data.streamTimes.push(song.ts)
    }
  })
  return data
}

module.exports = {
    description: 'Give number of plays up to an specific song',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<song-number>",
    ownerOnly: true,
    callback: ({ args, channel }) => {
      args.forEach(track => {
        const data = getData(track)
        const sortedStreamTimes = data.streamTimes.sort((a, b) => new Date(a) - new Date(b))
        const embed = new EmbedBuilder()
          .setTitle(`Statistics of ${track} *by ${data.artist}*`)
          .addFields(
            {
                name: "__Number of Plays__",
                value: data.songplayes.toString(),
            },
            {
              name: "__Total Playtime:__",
              value: (data.playtime.toString()/60000/60).toFixed(2) + " hours",
            },
            {
                name: "__Skips:__",
                value: `**${data.skipped}** (${(data.skipped / data.songplayes * 100).toFixed(2)}%)`,
            },
            {
                name: "__Number of 0 seconds Listening:__",
                value: data.notListened.toString(),
            },
            {
                name: "__Offline Streams:__",
                value: `**${data.offline}** (${(data.offline / data.songplayes * 100).toFixed(2)}%)`,
            },
            {
                name: "__Shuffle Streams:__",
                value:  `**${data.shuffle}** (${(data.shuffle / data.songplayes * 100).toFixed(2)}%)`,
            },
            {
                name: "__First Stream:__",
                value: formatUTCDate(sortedStreamTimes[0]),
            },
          )
          .setColor('#ff00ff')
        channel.send({ embeds: [embed] })
      })
    }
  }