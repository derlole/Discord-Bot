const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../songdata0.json')
const spotifyZwei = require('../songdata1.json')
const spotifyDrei = require('../songdata2.json')
const spotifyVier = require('../songdata3.json');
const spotify = spotifyEins.concat(spotifyZwei, spotifyDrei, spotifyVier);

module.exports = {
    description: 'Give number of plays up to an specific song',
    type: CommandType.LEGACY,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<song-number>",
    ownerOnly: true,
    callback: ({ args, message, channel }) => {
        let songnumber = 0;
        const track = args[0];
        let songplayes = 0;
        const totalsongnumber = spotify.length - 1;

        const intervalId = setInterval(() => {
            if (totalsongnumber > songnumber) {
                const song = spotify[songnumber];
                if (song && song.master_metadata_track_name && track === song.master_metadata_track_name.replace(/\s+/g, "-")) {
                    songplayes++;
                    console.log(songplayes);
                }
                songnumber++;

            } else {
                clearInterval(intervalId);
                const embed = new EmbedBuilder()
                    .setTitle(`Playtimes of ${track}`)
                    .addFields(
                        {
                            name: "Number of Plays:",
                            value: songplayes.toString(),
                        }
                    )
                    .setColor('#ff00ff');
                message.channel.send({embeds: [embed]});
            }
        }, 1);
    }
}