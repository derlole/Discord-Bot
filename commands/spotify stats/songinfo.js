const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Give number of plays up to an specific song',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<song-number>",
    ownerOnly: true,
    callback: ({ args, channel, guild, message }) => {

      function formatMinutes(milliseconds) {
        if (!milliseconds) return "no wert bruder"
        let seconds = Math.floor(milliseconds / 1000) % 60
        let minutes = Math.floor(milliseconds / 60000)
        return `${minutes.toString()}:${seconds.toString().padStart(2, "0")} min`
      }
      function formatHours(milliseconds) {
        if (!milliseconds) return "no wert bruder"
        let seconds = Math.floor(milliseconds / 1000) % 60
        let minutes = Math.floor(milliseconds / 60000) % 60
        let hours = Math.floor(milliseconds / 3600000)
        return `${hours.toString().padStart(2, "0")} h ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} min`
      }
              //user definition
              const user = message.author.id
              console.log(user)
              spotifyEins = require(`../../Spotifydatenverhau/songdata0-${user}.json`)
              spotifyZwei = require(`../../Spotifydatenverhau/songdata1-${user}.json`)
              spotifyDrei = require(`../../Spotifydatenverhau/songdata2-${user}.json`)
              spotifyVier = require(`../../Spotifydatenverhau/songdata3-${user}.json`)
               var spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
            //functions
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
      //rest
      const server ='1089153627643449436'
      if(guild.id !== server && message.author.id !== '702427586822930493') return channel.send('This command is not available here')
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
              value: formatHours(data.playtime),
            },
            {
              name: "__Average Playtime:__",
              value: formatMinutes(data.playtime / data.songplayes),
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