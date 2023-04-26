const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const getSpotifyData = require("../../Spotifydatenverhau/getSpotifyData");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');


module.exports = {
    description: 'Give Statistics of a Song',
    type: CommandType.SLASH,
    options: [
      {
        name: "song",
        description: "give your requested song",
        type: 3,
        required: true,
      },
    ],
    category: "spotify stats",
    slash: true,
    callback: async ({ args, channel, guild, interaction }) => {
      await interaction.deferReply()

    const user = interaction.user.id
    var spotify = getSpotifyData(user)
    
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
            function getDataMonthly(dataArray, songName) {
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
              dataArray.forEach(song => {
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
            function getDateBy12Months(dataArray, selectedDate) {
              const resultArray = []
              for (let i = 0; i < 24; i++) {
                const startDate = new Date(selectedDate.getTime());
                startDate.setUTCMonth(selectedDate.getMonth() + i);
                const endDate = new Date(startDate.getTime());
                endDate.setUTCMonth(startDate.getMonth() + 1);
          
                if (startDate.getMonth() === 11) {
                  startDate.setUTCFullYear(startDate.getFullYear() + 1);
                }
                const filteredArray = dataArray.filter(song => {
                  const songDate = new Date(song.ts);
                  return songDate >= startDate && songDate < endDate;
                });
                resultArray.push(filteredArray)
              }
              return resultArray
            }
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

      args = interaction.options.getString('song').split(" ")
      args.forEach(track  => {
        const data = getData(track)
        const sortedStreamTimes = data.streamTimes.sort((a, b) => new Date(a) - new Date(b))
        const embed = new EmbedBuilder()
          .setTitle(`Statistics of ${track} *by ${data.artist}*`)
          .addFields(
            { name: "__Number of Plays__", value: data.songplayes.toString() },
            { name: "__Total Playtime:__", value: formatHours(data.playtime) },
            { name: "__Average Playtime:__", value: formatMinutes(data.playtime / data.songplayes) },
            { name: "__Skips:__", value: `**${data.skipped}** (${(data.skipped / data.songplayes * 100).toFixed(2)}%)` },
            { name: "__Number of 0 seconds Listening:__", value: data.notListened.toString() },
            { name: "__Offline Streams:__", value: `**${data.offline}** (${(data.offline / data.songplayes * 100).toFixed(2)}%)` },
            { name: "__Shuffle Streams:__", value:  `**${data.shuffle}** (${(data.shuffle / data.songplayes * 100).toFixed(2)}%)` },
            { name: "__First Stream:__", value: formatUTCDate(sortedStreamTimes[0]) },
          )
          .setColor('#ff00ff')
        channel.send({ embeds: [embed] })
      })

      args.forEach( async track =>{
        const streamBegin = getData(track).streamTimes.sort((a, b) => new Date(a) - new Date(b))[0]
        const data = getDateBy12Months(spotify, new Date(streamBegin))
 
        console.log(getDataMonthly(data[20], track))

        const canvas = new ChartJSNodeCanvas({
          width: 1800,
          height: 600,
          backgroundColour: '#ffffff',
      },
      )
      const configuration = {
        type: 'line',
        data: {
          labels: [`1 Month`, `2 Month`, `3 Month`, `4 Month`, `5 Month`, `6 Month`, `7 Month`, `8 Month`, `9 Month`, `10 Month`, `11 Month`, `12 Month`, `13 Month`, `14 Month`, `15 Month`, `16 Month`, `17 Month`, `18 Month`, `19 Month`, `20 Month`, `21 Month`, `22 Month`, `23 Month`, `24 Month`],
           datasets: [
            {
              label: 'Streams',
              data: [getDataMonthly(data[0], track).songplayes, getDataMonthly(data[1], track).songplayes, getDataMonthly(data[2], track).songplayes, getDataMonthly(data[3], track).songplayes, getDataMonthly(data[4], track).songplayes, getDataMonthly(data[5], track).songplayes, getDataMonthly(data[6], track).songplayes, getDataMonthly(data[7], track).songplayes, getDataMonthly(data[8], track).songplayes, getDataMonthly(data[9], track).songplayes, getDataMonthly(data[10], track).songplayes, getDataMonthly(data[11], track).songplayes, getDataMonthly(data[12], track).songplayes, getDataMonthly(data[13], track).songplayes, getDataMonthly(data[14], track).songplayes, getDataMonthly(data[15], track).songplayes, getDataMonthly(data[16], track).songplayes, getDataMonthly(data[17], track).songplayes, getDataMonthly(data[18], track).songplayes, getDataMonthly(data[19], track).songplayes, getDataMonthly(data[20], track).songplayes, getDataMonthly(data[21], track).songplayes, getDataMonthly(data[22], track).songplayes, getDataMonthly(data[23], track).songplayes],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Skips',
              data: [getDataMonthly(data[0], track).skipped, getDataMonthly(data[1], track).skipped, getDataMonthly(data[2], track).skipped, getDataMonthly(data[3], track).skipped, getDataMonthly(data[4], track).skipped, getDataMonthly(data[5], track).skipped, getDataMonthly(data[6], track).skipped, getDataMonthly(data[7], track).skipped, getDataMonthly(data[8], track).skipped, getDataMonthly(data[9], track).skipped, getDataMonthly(data[10], track).skipped, getDataMonthly(data[11], track).skipped, getDataMonthly(data[12], track).skipped, getDataMonthly(data[13], track).skipped, getDataMonthly(data[14], track).skipped, getDataMonthly(data[15], track).skipped, getDataMonthly(data[16], track).skipped, getDataMonthly(data[17], track).skipped, getDataMonthly(data[18], track).skipped, getDataMonthly(data[19], track).skipped, getDataMonthly(data[20], track).skipped, getDataMonthly(data[21], track).skipped, getDataMonthly(data[22], track).skipped, getDataMonthly(data[23], track).skipped],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Offline',
              data: [getDataMonthly(data[0], track).offline, getDataMonthly(data[1], track).offline, getDataMonthly(data[2], track).offline, getDataMonthly(data[3], track).offline, getDataMonthly(data[4], track).offline, getDataMonthly(data[5], track).offline, getDataMonthly(data[6], track).offline, getDataMonthly(data[7], track).offline, getDataMonthly(data[8], track).offline, getDataMonthly(data[9], track).offline, getDataMonthly(data[10], track).offline, getDataMonthly(data[11], track).offline, getDataMonthly(data[12], track).offline, getDataMonthly(data[13], track).offline, getDataMonthly(data[14], track).offline, getDataMonthly(data[15], track).offline, getDataMonthly(data[16], track).offline, getDataMonthly(data[17], track).offline, getDataMonthly(data[18], track).offline, getDataMonthly(data[19], track).offline, getDataMonthly(data[20], track).offline, getDataMonthly(data[21], track).offline, getDataMonthly(data[22], track).offline, getDataMonthly(data[23], track).offline],
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Shuffle',
              data: [getDataMonthly(data[0], track).shuffle, getDataMonthly(data[1], track).shuffle, getDataMonthly(data[2], track).shuffle, getDataMonthly(data[3], track).shuffle, getDataMonthly(data[4], track).shuffle, getDataMonthly(data[5], track).shuffle, getDataMonthly(data[6], track).shuffle, getDataMonthly(data[7], track).shuffle, getDataMonthly(data[8], track).shuffle, getDataMonthly(data[9], track).shuffle, getDataMonthly(data[10], track).shuffle, getDataMonthly(data[11], track).shuffle, getDataMonthly(data[12], track).shuffle, getDataMonthly(data[13], track).shuffle, getDataMonthly(data[14], track).shuffle, getDataMonthly(data[15], track).shuffle, getDataMonthly(data[16], track).shuffle, getDataMonthly(data[17], track).shuffle, getDataMonthly(data[18], track).shuffle, getDataMonthly(data[19], track).shuffle, getDataMonthly(data[20], track).shuffle, getDataMonthly(data[21], track).shuffle, getDataMonthly(data[22], track).shuffle, getDataMonthly(data[23], track).shuffle],
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            }
          ],
        },
        
    }
    
      const image = await canvas.renderToBuffer(configuration)
      const attachment = new AttachmentBuilder(image)
      channel.send({
        files: [attachment],
      })
    })
  }
}