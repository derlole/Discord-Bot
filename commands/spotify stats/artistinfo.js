const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../../songdata0.json')
const spotifyZwei = require('../../songdata1.json')
const spotifyDrei = require('../../songdata2.json')
const spotifyVier = require('../../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

const getData = (artistName) => {
    let artistData = {
        songsListened: 0,
        songsCount: 0,
        artistSkipped: 0,
    }
    spotify.forEach(song => {
        if (song && song.master_metadata_album_artist_name && artistName === song.master_metadata_album_artist_name.replace(/\s+/g, "-")) {
            artistData.songsListened++
            if (song.skipped) artistData.artistSkipped++
        }
    })
    return artistData
}

module.exports = {
    description: 'Give Information about an Artist',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "<artist-name>",
    ownerOnly: true,
    callback: ({ args, channel }) => {
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
                        name: "Number of Songs Skipped:",
                        value: data.artistSkipped.toString(),
                    },
                )
                channel.send({ embeds: [embed] })
        })
    }
}