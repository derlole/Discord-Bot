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
        const track = args[0];
        let songnumber = 0;
        let songplayes = 0;
        let skipped = 0;
        let notSkipped = 0;
        let notListend = 0;
        let playtime = 0;
        const totalsongnumber = spotify.length - 1;

        const intervalId = setInterval(() => {
            if (totalsongnumber > songnumber) {
                const song = spotify[songnumber];
                if (song && song.master_metadata_track_name && track === song.master_metadata_track_name.replace(/\s+/g, "-")) {
                    songplayes++;
                    console.log(songplayes);
                    if (song.skipped) {
                        skipped++;
                    }
                    else {
                        notSkipped++;
                    }
                    if (song.ms_played === 0) {
                        notListend++;
                    }
                    if (song.ms_played > 0) {
                        playtime = playtime + song.ms_played;
                    }
                }
                songnumber++;

            } else {
                clearInterval(intervalId);
                const embed = new EmbedBuilder()
                    .setTitle(`Statistics of ${track}`)
                    .addFields(
                        {
                            name: "Number of Plays:",
                            value: songplayes.toString(),
                        },
                        {
                            name: "Number of Skips:",
                            value: skipped.toString(),
                        },
                        {
                            name: "Number of Listend trough:",
                            value: notSkipped.toString(),
                            inliene: true,
                        },
                        {
                            name: "Number of O seconds Listening:",
                            value: notListend.toString(),
                            inliene: true,
                        },
                        {
                            name: "Total Playtime:",
                            value: playtime.toString() + " ms",
                        },
                        {
                            name: "Average Skipperate:",
                            value: (skipped / songplayes*100).toString() + " %",
                        }

                    )
                    .setColor('#ff00ff');
                message.channel.send({embeds: [embed]});
            }
        }, 1);
    }
}