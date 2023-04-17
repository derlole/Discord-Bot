const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');


module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<artist-name>",
    ownerOnly: true,
    callback: ({ args, channel, guild, message }) => {
        //user definition
        if (message.author.id === '738480351046795305') {
            const spotifyEins = require('../../nicasongs0.json');
            const spotifyZwei = require('../../nicasongs1.json');
            const spotifyDrei = require('../../nicasongs2.json');
            const spotifyVier = require('../../nicasongs3.json');
            var spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
        }
        if (message.author.id === '702427586822930493') {
            const spotifyEins = require('../../songdata0.json')
            const spotifyZwei = require('../../songdata1.json')
            const spotifyDrei = require('../../songdata2.json')
            const spotifyVier = require('../../songdata3.json');
            var spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);
        }

//functions
const getData = (artistName) => {
    let artistData = {
        songsListened: 0,
        artistSkipped: 0,
        artistPlaytime: 0,
        artistShuffle: 0,
    }
    spotify.forEach(song => {
        if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
            artistData.songsListened++
            if (song.skipped) artistData.artistSkipped++
            if (song.ms_played > 0) artistData.artistPlaytime = artistData.artistPlaytime + song.ms_played
            if (song.shuffle) artistData.artistShuffle++
        }
    })
    return artistData
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
        if(guild.id !== server && message.author.id !== '702427586822930493') return channel.send('This command is not available here')
        const songs = {}; 
        spotify.forEach(song => {
            if(song.master_metadata_album_artist_name) {
                const artistName = song.master_metadata_album_artist_name.replace(/\s+/g, "-");
                const name = song.master_metadata_track_name;

                if (artistName === args[0]) {
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
        sortedSongs = Object.entries(songs).sort((a, b) => b[1].played - a[1].played);
        const embed2 = new EmbedBuilder()
            .setTitle(`Top 10 Songs of ${args[0]} *(Total Songs: ${sortedSongs.length})* `)
            .addFields(
                {
                    name: "Song Name",
                    value: `**${sortedSongs.slice(0, 10).map(song => song[0]).join("\n -\n")}**`,
                    inline: true,
                },
                {
                    name: "Number of Plays",
                    value: sortedSongs.slice(0, 10).map(song => song[1].played).join("\n -\n"),
                    inline: true,
                },
                {
                    name: "Time Played",
                    value: sortedSongs.slice(0, 10).map(song => formatHours(song[1].ms_played)).join("\n -\n"),
                    inline: true,
                },
            )
            channel.send({ embeds: [embed2],})
    }
}