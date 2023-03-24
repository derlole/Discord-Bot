const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../../songdata0.json')
const spotifyZwei = require('../../songdata1.json')
const spotifyDrei = require('../../songdata2.json')
const spotifyVier = require('../../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<sort-option>",
    ownerOnly: true,
    callback: ({args, channel}) => {
        const songs = {}; 

        spotify.forEach(song => {
            const name = song.master_metadata_track_name;
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
                sortedSongs = Object.entries(songs).sort((b, a) => (b[1].offline / b[1].played * 100) - (a[1].offline / a[1].played * 100));
                break
            case 'time':
                sortedSongs = Object.entries(songs).sort((a, b) => b[1].ms_played - a[1].ms_played);
                break
        }
    
        sortedSongs.forEach(([songName, song]) => {
            const embed = new EmbedBuilder()
                .setTitle(`Statistics of ${songName}`) 
                .addFields(
                    {
                        name: "Number of Plays:",
                        value: song.played.toString(),
                    },
                    {
                        name: "Total Time Played:",
                        value: `${(song.ms_played / 1000 / 60).toFixed(2)} Minutes`,
                    },
                    {
                        name: "Number of Skips:",
                        value: `**${song.skipped}** (${(song.skipped / song.played * 100).toFixed(2)}%)`,
                    },
                    { 
                        name: "Number of Listened through:",
                        value: `**${song.played - song.skipped}** (${((song.played - song.skipped) / song.played * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "Number of Shuffle Plays:",
                        value: `**${song.shuffle}** (${(song.shuffle / song.played * 100).toFixed(2)}%)`,
                    },
                    {
                        name: "Number of Offline Plays:",
                        value: `**${song.offline}** (${(song.offline / song.played * 100).toFixed(2)}%)`,
                    },
                )
                .setTimestamp()
                .setColor('#00FF00');
                channel.send({ embeds: [embed] })
        });
    }  
};
