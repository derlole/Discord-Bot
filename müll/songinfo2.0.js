const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../songdata0.json')
const spotifyZwei = require('../songdata1.json')
const spotifyDrei = require('../songdata2.json')
const spotifyVier = require('../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

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
  }
  spotify.forEach(song => {
    if (song && song.master_metadata_track_name && track === song.master_metadata_track_name.replace(/\s+/g, "-")) {
      data.songplayes++
      song.skipped ? data.skipped++ : data.notSkipped++
      if (song.ms_played === 0) data.notListened++
      if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
      if (song.offline) data.offline++
      if (song.shuffle) data.shuffle++
    }
  })
  return data
}

module.exports = {
    description: 'Give number of plays up to an specific song',
    type: CommandType.LEGACY,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<song-number>",
    ownerOnly: true,
    callback: ({ args, message, channel }) => {
      const track = args[0]
      const embed = new EmbedBuilder()
                    .setTitle(`Statistics of ${track}`)
                    .addFields(
                        {
                            name: "Number of Plays:",
                            value: .toString(),
                        },
                        {
                            name: "Number of Skips:",
                            value: skipped.toString(),
                        },
                        {
                            name: "Number of Listned through:",
                            value: notSkipped.toString(),
                            //inliene: true,
                        },
                        {
                            name: "Number of O seconds Listening:",
                            value: notListend.toString(),
                            //inliene: true,
                        },
                        {
                            name: "Total Playtime:",
                            value: playtime.toString() + " ms",
                        },
                        {
                            name: "Average skip rate:",
                            value: `${Math.round(skipped / songplayes*100*100)/100} %`,
                        },
                        {
                            name: "Offline Streams:",
                            value: `**${offline.toString()}**\n${Math.round(offline.toString()/songplayes*100*100)/100} %`,
                        },
                        {
                            name: "Shuffle Streams:",
                            value:  `**${shuffle.toString()}**\n${Math.round(shuffle.toString()/songplayes*100*100)/100} %`,
                        },

                    )
                    .setColor('#ff00ff');
      return { embeds: embed }
    }
}