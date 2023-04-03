const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../songdata0.json')
const spotifyZwei = require('../songdata1.json')
const spotifyDrei = require('../songdata2.json')
const spotifyVier = require('../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

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
module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<sort-option>",
    ownerOnly: true,
    callback: ({args, channel, guild, message}) => {
        const server ='1089153627643449436'
        if(guild.id !== server && message.author.id !== '702427586822930493') return channel.send('This command is not available here')
        const songs = {}; 

        spotify.forEach(song => {
            const name = song.master_metadata_track_name;
            if (songs[name]) {
                songs[name].played++;
                songs[name].ms_played += song.ms_played;
                if(song.shuffle) songs[name].shuffle++;
                if(song.offline) songs[name].offline++;
                if(song.skipped) songs[name].skipped++; 
                songs[name].firstStream.push(song.ts);
            } else {
                songs[name] = {
                    played: 1,
                    ms_played: song.ms_played,
                    shuffle: song.shuffle ? 1 : 0,
                    offline: song.offline ? 1 : 0,
                    skipped: song.skipped ? 1 : 0,
                    artist: song.master_metadata_album_artist_name,
                    firstStream: [song.ts],
                }
            }
        });
        
        const sortOption = args[0].toLowerCase();
        let sortedSongs
        switch (sortOption) {
            case 'plays':
                sortedSongs = Object.entries(songs).sort((a, b) => b[1].played - a[1].played)
                break
            case 'skips':
                sortedSongs = Object.entries(songs).sort((a, b) => b[1].skipped - a[1].skipped);
                break
            case 'offline':
                sortedSongs = Object.entries(songs).sort((a, b) => b[1].offline - a[1].offline);
                break
            case 'skips%':
                sortedSongs = Object.entries(songs).sort((a, b) => (b[1].skipped / b[1].played * 100) - (a[1].skipped / a[1].played * 100));
                break
            case 'offline%':
                sortedSongs = Object.entries(songs).sort((a, b) => (b[1].offline / b[1].played * 100) - (a[1].offline / a[1].played * 100));
                break
            case 'time':
                sortedSongs = Object.entries(songs).sort((a, b) => b[1].ms_played - a[1].ms_played);
                break
            case 'time%':
                sortedSongs = Object.entries(songs).sort((a, b) => (b[1].ms_played / b[1].played) - (a[1].ms_played / a[1].played));
                break
            case 'shuffle%':
                sortedSongs = Object.entries(songs).sort((a, b) => (b[1].shuffle / b[1].played * 100) - (a[1].shuffle / a[1].played * 100));
                break
        }
        let count = 0;
        sortedSongs.forEach(([songName, song]) => {
            song.sortedStreamTimes = song.firstStream.sort((a, b) => a - b);
            if(song.ms_played > 3600000) {
                var time = formatHours(song.ms_played)
            }
            else {
                var time = formatMinutes(song.ms_played)
            }
            if (count >= 10) return;
            const embed = new EmbedBuilder()
            
                .setTitle(`Statistics of ${songName} by ${song.artist}`) 
                .addFields(
                    {
                        name: "__Number of Plays__:",
                        value: song.played.toString(),
                    },
                    {
                        name: "__Total Playtime__:",
                        value: time,
                    },
                    {
                        name: "__Average Time Played:__",
                        value: `${formatMinutes(song.ms_played / song.played )}`,
                    },
                    {
                        name: "__Skips:__",
                        value: `**${song.skipped}** (${(song.skipped / song.played * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "__Number of Shuffle Plays:__",
                        value: `**${song.shuffle}** (${(song.shuffle / song.played * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "__Number of Offline Plays:__",
                        value: `**${song.offline}** (${(song.offline / song.played * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "__First Stream:__",
                        value: formatUTCDate(song.sortedStreamTimes[0]),
                    },
                )
                .setTimestamp()
                .setColor('#00FF00');
                channel.send({ embeds: [embed] })
            count++;
        });
    }  
};
