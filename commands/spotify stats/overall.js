const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const getSpotifyData = require("../../Spotifydatenverhau/getSpotifyData");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    description: 'Give number of plays up to an specific song',
    type: CommandType.LEGACY,
    minArgs: 0,
    expectedArgs: "",
    ownerOnly: true,
    callback: async ({ channel, guild, message }) => {

        const user = message.author.id
        var spotify = getSpotifyData(user)

    const getData = () => {
      let data = {
        songplayes: 0,
        skipped: 0,
        notSkipped: 0,
        notListened: 0,
        playtime: 0,
        shuffle: 0,
        offline: 0,
        streamTimes: [],
        inacurateSkipps: 0,
        
      }
      spotify.forEach(song => {
        if (song && song.master_metadata_track_name) {
          data.songplayes++
          song.skipped ? data.skipped++ : data.notSkipped++
          if (song.ms_played === 0) data.notListened++
          if (song.ms_played > 0) data.playtime = data.playtime + song.ms_played
          if (song.offline) data.offline++
          if (song.shuffle) data.shuffle++
          data.streamTimes.push(song.ts)
          //if (song.skipped === null) data.inacurateSkipps++
          if (song.reason_end === "fwdbtn") data.skipped++
        }
      })
      return data
    }
    const getDataMonthly = ( dataArray ) => {
      let montData = {
          songsListened: 0,
          songsSkipped: 0,
          totalPlaytime: 0,
          songsShuffle: 0,
          songsOffline: 0,
          //inacurateSkipps: 0,
          streamTimes: [],
      }
      dataArray.forEach(song => {
          if (song.master_metadata_track_name) {
          montData.songsListened++
          if (song.skipped)  montData.songsSkipped++ 
          if (song.ms_played === 0) montData.notListened++
          if (song.ms_played > 0) montData.totalPlaytime = montData.totalPlaytime + song.ms_played
          if (song.offline) montData.songsOffline++
          if (song.shuffle) montData.songsShuffle++
          //if (song.skipped === null) montData.inacurateSkipps++
          if (song.reason_end === "fwdbtn") montData.songsSkipped++
          montData.streamTimes.push(song.ts)
          }
      })
      return montData
  }
  function formatUTCMonth(dateString) {
      const date = new Date(dateString)
      const options = {
        month: "long",
        year: "numeric",
      }
      return date.toLocaleDateString("de-DE", options)
    }
  function getDateBy12Months(dataArray, selectedDate) {
      const resultArray = [];
      for (let i = 0; i < 48; i++) {
        const startDate = new Date(selectedDate.getTime());
        startDate.setUTCMonth(selectedDate.getMonth() + i);
        const endDate = new Date(startDate.getTime());
    
        if (startDate.getMonth() === 11) {
          endDate.setUTCFullYear(startDate.getFullYear() + 1, 0, 1);
        } else {
          endDate.setUTCMonth(startDate.getMonth() + 1);
        }
    
        const filteredArray = dataArray.filter((song) => {
          const songDate = new Date(song.ts);
          return songDate >= startDate && songDate < endDate;
        });
    
        resultArray.push(filteredArray);
      }
      return resultArray;
    }
      const server ='1089153627643449436'
      if(guild.id !== server && message.author.id !== '702427586822930493') return channel.send('This command is not available here')
        const data = getData()
        const embed = new EmbedBuilder()
          .setTitle(`Statistics`)
          .addFields(
              {
                  name: "__Played songs:__",
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
              /*{
                name: "__Inacurate Skips:__",
                value: `**${data.inacurateSkipps}** (${(data.inacurateSkipps / data.songplayes * 100).toFixed(2)}%)`,
              },*/
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
          )
          .setColor('#ff00ff')
        channel.send({ embeds: [embed] })

        const streamBegin = getData().streamTimes.sort((a,b) => new Date(a) - new Date(b))[0]
        const datacanvas = getDateBy12Months(spotify, new Date(streamBegin))

        const canvas = new ChartJSNodeCanvas({ 
          width: 1800,
          height: 600,
          backgroundColor: '#ffffff',
      });

      const configuration = {
        type: 'line',
        data: {
          labels: [formatUTCMonth(new Date(streamBegin)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 1)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 2)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 3)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 4)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 5)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 6)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 7)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 8)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 9)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 10)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 11)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 12)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 13)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 14)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 15)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 16)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 17)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 18)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 19)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 20)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 21)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 22)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 23)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 24)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 25)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 26)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 27)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 28)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 29)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 30)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 31)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 32)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 33)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 34)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 35)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 36)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 37)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 38)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 39)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 40)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 41)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 42)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 43)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 44)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 45)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 46)), formatUTCMonth(new Date(streamBegin).setUTCMonth(new Date(streamBegin).getMonth() + 47))],
          datasets: [ 
            {
              label: 'Songs',
              data: [getDataMonthly(datacanvas[0]).songsListened, getDataMonthly(datacanvas[1]).songsListened, getDataMonthly(datacanvas[2]).songsListened, getDataMonthly(datacanvas[3]).songsListened, getDataMonthly(datacanvas[4]).songsListened, getDataMonthly(datacanvas[5]).songsListened, getDataMonthly(datacanvas[6]).songsListened, getDataMonthly(datacanvas[7]).songsListened, getDataMonthly(datacanvas[8]).songsListened, getDataMonthly(datacanvas[9]).songsListened, getDataMonthly(datacanvas[10]).songsListened, getDataMonthly(datacanvas[11]).songsListened, getDataMonthly(datacanvas[12]).songsListened, getDataMonthly(datacanvas[13]).songsListened, getDataMonthly(datacanvas[14]).songsListened, getDataMonthly(datacanvas[15]).songsListened, getDataMonthly(datacanvas[16]).songsListened, getDataMonthly(datacanvas[17]).songsListened, getDataMonthly(datacanvas[18]).songsListened, getDataMonthly(datacanvas[19]).songsListened, getDataMonthly(datacanvas[20]).songsListened, getDataMonthly(datacanvas[21]).songsListened, getDataMonthly(datacanvas[22]).songsListened, getDataMonthly(datacanvas[23]).songsListened, getDataMonthly(datacanvas[24]).songsListened, getDataMonthly(datacanvas[25]).songsListened, getDataMonthly(datacanvas[26]).songsListened, getDataMonthly(datacanvas[27]).songsListened, getDataMonthly(datacanvas[28]).songsListened, getDataMonthly(datacanvas[29]).songsListened, getDataMonthly(datacanvas[30]).songsListened, getDataMonthly(datacanvas[31]).songsListened, getDataMonthly(datacanvas[32]).songsListened, getDataMonthly(datacanvas[33]).songsListened, getDataMonthly(datacanvas[34]).songsListened, getDataMonthly(datacanvas[35]).songsListened, getDataMonthly(datacanvas[36]).songsListened, getDataMonthly(datacanvas[37]).songsListened, getDataMonthly(datacanvas[38]).songsListened, getDataMonthly(datacanvas[39]).songsListened, getDataMonthly(datacanvas[40]).songsListened, getDataMonthly(datacanvas[41]).songsListened, getDataMonthly(datacanvas[42]).songsListened, getDataMonthly(datacanvas[43]).songsListened, getDataMonthly(datacanvas[44]).songsListened, getDataMonthly(datacanvas[45]).songsListened, getDataMonthly(datacanvas[46]).songsListened, getDataMonthly(datacanvas[47]).songsListened],
              borderColor: '#ff00ff',
              backgroundColor: '#ff00ff',
              fill: false,
              tension: 0.3,
              pointRadius: 0,
            },
            {
              label: 'Skipps',
              data: [getDataMonthly(datacanvas[0]).songsSkipped, getDataMonthly(datacanvas[1]).songsSkipped, getDataMonthly(datacanvas[2]).songsSkipped, getDataMonthly(datacanvas[3]).songsSkipped, getDataMonthly(datacanvas[4]).songsSkipped, getDataMonthly(datacanvas[5]).songsSkipped, getDataMonthly(datacanvas[6]).songsSkipped, getDataMonthly(datacanvas[7]).songsSkipped, getDataMonthly(datacanvas[8]).songsSkipped, getDataMonthly(datacanvas[9]).songsSkipped, getDataMonthly(datacanvas[10]).songsSkipped, getDataMonthly(datacanvas[11]).songsSkipped, getDataMonthly(datacanvas[12]).songsSkipped, getDataMonthly(datacanvas[13]).songsSkipped, getDataMonthly(datacanvas[14]).songsSkipped, getDataMonthly(datacanvas[15]).songsSkipped, getDataMonthly(datacanvas[16]).songsSkipped, getDataMonthly(datacanvas[17]).songsSkipped, getDataMonthly(datacanvas[18]).songsSkipped, getDataMonthly(datacanvas[19]).songsSkipped, getDataMonthly(datacanvas[20]).songsSkipped, getDataMonthly(datacanvas[21]).songsSkipped, getDataMonthly(datacanvas[22]).songsSkipped, getDataMonthly(datacanvas[23]).songsSkipped, getDataMonthly(datacanvas[24]).songsSkipped, getDataMonthly(datacanvas[25]).songsSkipped, getDataMonthly(datacanvas[26]).songsSkipped, getDataMonthly(datacanvas[27]).songsSkipped, getDataMonthly(datacanvas[28]).songsSkipped, getDataMonthly(datacanvas[29]).songsSkipped, getDataMonthly(datacanvas[30]).songsSkipped, getDataMonthly(datacanvas[31]).songsSkipped, getDataMonthly(datacanvas[32]).songsSkipped, getDataMonthly(datacanvas[33]).songsSkipped, getDataMonthly(datacanvas[34]).songsSkipped, getDataMonthly(datacanvas[35]).songsSkipped, getDataMonthly(datacanvas[36]).songsSkipped, getDataMonthly(datacanvas[37]).songsSkipped, getDataMonthly(datacanvas[38]).songsSkipped, getDataMonthly(datacanvas[39]).songsSkipped, getDataMonthly(datacanvas[40]).songsSkipped, getDataMonthly(datacanvas[41]).songsSkipped, getDataMonthly(datacanvas[42]).songsSkipped, getDataMonthly(datacanvas[43]).songsSkipped, getDataMonthly(datacanvas[44]).songsSkipped, getDataMonthly(datacanvas[45]).songsSkipped, getDataMonthly(datacanvas[46]).songsSkipped, getDataMonthly(datacanvas[47]).songsSkipped],
              borderColor: '#ff0000',
              backgroundColor: '#ff0000',
              fill: false,
              tension: 0.3,
              pointRadius: 0,
            },
            /*{
              label: 'Inacurate Skipps',
              data: [getDataMonthly(datacanvas[0]).inacurateSkipps, getDataMonthly(datacanvas[1]).inacurateSkipps, getDataMonthly(datacanvas[2]).inacurateSkipps, getDataMonthly(datacanvas[3]).inacurateSkipps, getDataMonthly(datacanvas[4]).inacurateSkipps, getDataMonthly(datacanvas[5]).inacurateSkipps, getDataMonthly(datacanvas[6]).inacurateSkipps, getDataMonthly(datacanvas[7]).inacurateSkipps, getDataMonthly(datacanvas[8]).inacurateSkipps, getDataMonthly(datacanvas[9]).inacurateSkipps, getDataMonthly(datacanvas[10]).inacurateSkipps, getDataMonthly(datacanvas[11]).inacurateSkipps, getDataMonthly(datacanvas[12]).inacurateSkipps, getDataMonthly(datacanvas[13]).inacurateSkipps, getDataMonthly(datacanvas[14]).inacurateSkipps, getDataMonthly(datacanvas[15]).inacurateSkipps, getDataMonthly(datacanvas[16]).inacurateSkipps, getDataMonthly(datacanvas[17]).inacurateSkipps, getDataMonthly(datacanvas[18]).inacurateSkipps, getDataMonthly(datacanvas[19]).inacurateSkipps, getDataMonthly(datacanvas[20]).inacurateSkipps, getDataMonthly(datacanvas[21]).inacurateSkipps, getDataMonthly(datacanvas[22]).inacurateSkipps, getDataMonthly(datacanvas[23]).inacurateSkipps, getDataMonthly(datacanvas[24]).inacurateSkipps, getDataMonthly(datacanvas[25]).inacurateSkipps, getDataMonthly(datacanvas[26]).inacurateSkipps, getDataMonthly(datacanvas[27]).inacurateSkipps, getDataMonthly(datacanvas[28]).inacurateSkipps, getDataMonthly(datacanvas[29]).inacurateSkipps, getDataMonthly(datacanvas[30]).inacurateSkipps, getDataMonthly(datacanvas[31]).inacurateSkipps, getDataMonthly(datacanvas[32]).inacurateSkipps, getDataMonthly(datacanvas[33]).inacurateSkipps, getDataMonthly(datacanvas[34]).inacurateSkipps, getDataMonthly(datacanvas[35]).inacurateSkipps, getDataMonthly(datacanvas[36]).inacurateSkipps, getDataMonthly(datacanvas[37]).inacurateSkipps, getDataMonthly(datacanvas[38]).inacurateSkipps, getDataMonthly(datacanvas[39]).inacurateSkipps, getDataMonthly(datacanvas[40]).inacurateSkipps, getDataMonthly(datacanvas[41]).inacurateSkipps, getDataMonthly(datacanvas[42]).inacurateSkipps, getDataMonthly(datacanvas[43]).inacurateSkipps, getDataMonthly(datacanvas[44]).inacurateSkipps, getDataMonthly(datacanvas[45]).inacurateSkipps, getDataMonthly(datacanvas[46]).inacurateSkipps, getDataMonthly(datacanvas[47]).inacurateSkipps],
              borderColor: '#f56c42',
              backgroundColor: '#f56c42',
              fill: false,
              tension: 0.3,
              pointRadius: 4,
            }*/
          ]
        },
      };
      const image = await canvas.renderToBuffer(configuration);
      const attachment = new AttachmentBuilder(image);
      channel.send({ files: [attachment] });    
    }
  }