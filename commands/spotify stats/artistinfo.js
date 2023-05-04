const { CommandType } = require("wokcommands")
const { EmbedBuilder, spoiler } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');
const getSpotifyData = require('../../Spotifydatenverhau/getSpotifyData')


module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.SLASH,
    options: [
      {
        name: "artist",
        description: "give your requested artist",
        type: 3,
        required: true,
      },
    ],
    category: "spotify stats",
    slash: true,
    callback:  async ({ interaction, channel, guild }) => {
        try {
            await interaction.deferReply()
        } catch (error) {
            console.log(error)
        }
        const user = interaction.user.id
         var spotify = getSpotifyData(user)

//functions
const getData = (artistName) => {
    let artistData = {
        songsListened: 0,
        artistSkipped: 0,
        artistPlaytime: 0,
        artistShuffle: 0,
        streamTimes: [],
    }
    spotify.forEach(song => {
        if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
            artistData.songsListened++
            if (song.skipped) artistData.artistSkipped++
            if (song.ms_played > 0) artistData.artistPlaytime = artistData.artistPlaytime + song.ms_played
            if (song.shuffle) artistData.artistShuffle++
            artistData.streamTimes.push(song.ts)
        }
    })
    return artistData
}
const getDataMonthly = ( dataArray, artistName) => {
    let artistData = {
        songsListened: 0,
        artistSkipped: 0,
        artistPlaytime: 0,
        artistShuffle: 0,
        streamTimes: [],
    }
    dataArray.forEach(song => {
        if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
            artistData.songsListened++
            if (song.skipped) artistData.artistSkipped++
            if (song.ms_played > 0) artistData.artistPlaytime = artistData.artistPlaytime + song.ms_played
            if (song.shuffle) artistData.artistShuffle++
            artistData.streamTimes.push(song.ts)
        }
    })
    return artistData
}
function getDateBy12Months(dataArray, selectedDate) {
    const resultArray = [];
    for (let i = 0; i < 24; i++) {
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
function formatMinutes(milliseconds) {
    if (!milliseconds) return 'no wert bruder'
    let seconds = Math.floor(milliseconds / 1000) % 60
    let minutes = Math.floor(milliseconds / 60000)
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')} min`
  }
function formatHours(milliseconds) {
    if (!milliseconds) return 'no wert bruder'
    let seconds = Math.floor(milliseconds / 1000) % 60
    let minutes = Math.floor(milliseconds / 60000) % 60
    let hours = Math.floor(milliseconds / 3600000)
    return `${hours.toString().padStart(2, '0')} h ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} min`
  }


//der ganze rest
        const server ='1089153627643449436'
        if(guild.id !== server) return channel.send('This command is not available here')
        const songs = {}; 
        spotify.forEach(song => {
            if(song.master_metadata_album_artist_name) {
                const artistName = song.master_metadata_album_artist_name.replace(/\s+/g, "-");
                const name = song.master_metadata_track_name;

                if (artistName === interaction.options.getString('artist')) {
                if (songs[name]) {
                    songs[name].played++;
                    songs[name].ms_played += song.ms_played;
                    if(song.shuffle) songs[name].shuffle++;
                    if(song.offline) songs[name].offline++;
                    if(song.skipped) songs[name].skipped++;   
                    
                } else {
                    songs[name] = {
                        played: 1,
                        ms_played: song.ms_played,
                        shuffle: song.shuffle ? 1 : 0,
                        offline: song.offline ? 1 : 0,
                        skipped: song.skipped ? 1 : 0,
                        artist: song.master_metadata_album_artist_name,
                        
                    }
            }}}
        });
        const args = interaction.options.getString('artist').split(' ')
        args.forEach(artist => {
            const data = getData(artist)
            const embed = new EmbedBuilder()
                .setTitle(`Statistics of ${artist}`)
                .addFields(
                    {
                        name: "Number of Songs Listened:",
                        value: data.songsListened.toString(),
                    },
                    {
                        name: "Total Playtime:",
                        value: formatHours(data.artistPlaytime),
                    },
                    {
                        name: "Number of Songs Skipped:",
                        value: `**${data.artistSkipped}** (${(data.artistSkipped / data.songsListened * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "Number of Songs Played in Shuffle:",
                        value: `**${data.artistShuffle}** (${(data.artistShuffle / data.songsListened * 100).toFixed(2)}%)`,
                    },
                )
                channel.send({ embeds: [embed] })
        })
        args.forEach( async artist => {
            const streamBegin = getData(artist).streamTimes.sort((a,b) => new Date(a) - new Date(b))[0]
            const data = getDateBy12Months(spotify, new Date(streamBegin))
            //console.log(data[0])
            const canvas = new ChartJSNodeCanvas({ 
                width: 800,
                height: 600,
                backgroundColor: '#ffffff',
            });
            const configuration = {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Songs Listened',
                            data:  [getDataMonthly(data[0], artist).songsListened, getDataMonthly(data[1], artist).songsListened, getDataMonthly(data[2], artist).songsListened, getDataMonthly(data[3], artist).songsListened, getDataMonthly(data[4], artist).songsListened, getDataMonthly(data[5], artist).songsListened, getDataMonthly(data[6], artist).songsListened, getDataMonthly(data[7], artist).songsListened, getDataMonthly(data[8], artist).songsListened, getDataMonthly(data[9], artist).songsListened, getDataMonthly(data[10], artist).songsListened, getDataMonthly(data[11], artist).songsListened],
                            borderColor: '#1DB954',
                            backgroundColor: '#1DB954',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                        }
                    ]
                },
        }
        const image = await canvas.renderToBuffer(configuration);
        const attachment = new AttachmentBuilder(image);
        channel.send({ files: [attachment] });
        })
        
        sortedSongs = Object.entries(songs).sort((a, b) => b[1].played - a[1].played);        
    }
}