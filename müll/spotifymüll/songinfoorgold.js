const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');
const spotifyEins = require('../../songdata0.json')
const spotifyZwei = require('../../songdata1.json')
const spotifyDrei = require('../../songdata2.json')
const spotifyVier = require('../../songdata3.json');
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
        let shuffle = 0;
        let offline = 0;
        const totalsongnumber = spotify.length - 1;

        const intervalId = setInterval(() => {
            if (totalsongnumber > songnumber) {
                const song = spotify[songnumber];
                if (song && song.master_metadata_track_name && track === song.master_metadata_track_name.replace(/\s+/g, "-")) {
                    songplayes++;
                    console.log(songplayes);
                    song.skipped ? skipped++ : notSkipped++
                    if (song.ms_played === 0) {
                        notListend++;
                    }
                    if (song.ms_played > 0) {
                        playtime += song.ms_played;
                    }
                    if (song.offline) {
                        offline++;
                    }
                    if (song.shuffle) {
                        shuffle++;
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
                            name: "Number of Listned through:",
                            value: notSkipped.toString(),
                            //inliene: true,
                        },
                        {
                            name: "Number of O seconds Listening:",
                            value: notListend.toString(),
                            //inliene: true,
                        },
                        {
                            name: "Total Playtime:",
                            value: playtime.toString() + " ms",
                        },
                        {
                            name: "Average skip rate:",
                            value: `${Math.round(skipped / songplayes*100*100)/100} %`,
                        },
                        {
                            name: "Offline Streams:",
                            value: `**${offline.toString()}**\n${Math.round(offline.toString()/songplayes*100*100)/100} %`,
                        },
                        {
                            name: "Shuffle Streams:",
                            value:  `**${shuffle.toString()}**\n${Math.round(shuffle.toString()/songplayes*100*100)/100} %`,
                        },

                    )
                    .setColor('#ff00ff');
                message.channel.send({embeds: [embed]});
            }
        }, 1);
    }
}