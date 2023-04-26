const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require('discord.js');


module.exports = {
    description: 'Give possible Spotify-command oportunities',
    type: CommandType.LEGACY,
    minArgs: 0,
    expectedArgs: "",

    callback: ({ args, channel, guild, message }) => {
        const argument = args[0]
        const addition = args[1]
        const server ='1089153627643449436'
        if(guild.id === server && message.content === '!help')
        {
            const helpembed = new EmbedBuilder()
            .setTitle(`Spotify-Commands`)
            .addFields(
                {
                    name: "__Overall__",
                    value: "You will get the overall statistics of your Spotify-data \nMore Information: ```!help overall```",
                },
                {
                    name: "__Songinfo__",
                    value: "You will get the statistics of a specific song.\n*(you have to add the name of the song after the command)*\nMore information: ```!help songinfo```"
                },
                {
                    name: "__Artistinfo__",
                    value: "You will get the statistics of a specific artist with your top 10 songs. \n*(you have to add the name of the artist after the command)* \nMore information: ```!help artistinfo```",
                },
                {
                    name: "__Stats__",
                    value: "You will get the Statistics of top songs based on your requests.\n*(you have to request sort options after the command)* \nMore information: ```!help stats```",
                },
            )
            .setColor('#1DB954')
            channel.send({ embeds: [helpembed] })
            
        }
        if(guild.id === server && argument === 'yeoyeoyeo') {
            const yeoyeoyeoembed = new EmbedBuilder()
            .setTitle(`The Yeoyeoyeo Statistics`)
            .addFields(
                {
                    name: 'Yeoyeoyeo',
                    value: 'Squid is proud because you found a secret command! \nIt is completely useless, but try typing: \n ``` !yeoyeoyeo```',
                },

            )
            .setColor('#1DB954')
            channel.send({ embeds: [yeoyeoyeoembed] })
        }
        if(guild.id === server && argument === 'overall') {
            if (addition) return channel.send('You can only use the command without any additional arguments')
            const overallembed = new EmbedBuilder()
            .setTitle(`The Overall Statistics`)
            .addFields(
                {
                    name: "**The Overall Statistics are the statistics of all songs you have listened to on Spotify.**\n",
                    value: '**They include:** \n \t Played Songs \n \t Total Playtime \n \t Skips \n \t Number of 0 seconds Listening \n \t Offline Streams \n \t Shuffle Streams',
                },
                {
                    name: 'required command:',
                    value: '```!overall```'
                }
            )
            .setColor('#1DB954')
            channel.send({ embeds: [overallembed] })
        }
        if(guild.id === server && argument === 'songinfo') {
            if (addition) return channel.send('You can only use the command without any additional arguments')
            const songinfoembed = new EmbedBuilder()
            .setTitle(`The Songinfo Statistics`)
            .addFields(
                {
                    name: "**The Songinfo Statistics are the statistics of a specific song you have listened to on Spotify.**\n",
                    value: '**They include:** \n \t Played Songs \n \t Total Playtime \n \t Skips \n \t Number of 0 seconds Listening \n \t Offline Streams \n \t Shuffle Streams',
                },
                {
                    name: 'required command:',
                    value: '```!songinfo <Song-name>```\n*(you have to add the name of the song in regarding capital and small form letters and using hyphens instead of blanks)*'
                }
            )
            .setColor('#1DB954')
            channel.send({ embeds: [songinfoembed] })
        }
        if(guild.id === server && argument === 'artistinfo') {
            if (addition) return channel.send('You can only use the command without any additional arguments')
            const artistinfoembed = new EmbedBuilder()
            .setTitle(`The Artistinfo Statistics`)
            .addFields(
                {
                    name: "**The Artistinfo Statistics are the statistics of a specific artist you have listened to on Spotify.**\n",
                    value: '**They include:** \n \t Played Songs \n \t Total Playtime \n \t Skips \n \t Number of 0 seconds Listening \n \t Offline Streams \n \t Shuffle Streams',
                },
                {
                    name: "**The Artistinfo Statistics also include the Top 10 Songs of the Artist**",
                    value: 'name of the song\nnumber of plays\nplayed time'
                },
                {
                    name: 'required command:',
                    value: '```!artistinfo <Artist-name>```\n*(you have to add the name of the artist in regarding capital and small form letters and using hyphens instead of blanks)*'
                }
            )
            .setColor('#1DB954')
            channel.send({ embeds: [artistinfoembed] })
        }
        if(guild.id === server && argument === 'stats') {
            if (!addition) {
            const statsembed = new EmbedBuilder()
            .setTitle(`The Stats Statistics`)
            .addFields(
                {
                    name: "**The Stats Statistics are the statistics of the Top 10 Songs based on your requests**",
                    value: '\tPlayed Songs \n \t Total Playtime \n \t Skips \n \t Number of 0 seconds Listening \n \t Offline Streams \n \t Shuffle Streams',
                },
                {
                    name: '__Sorting order__',
                    value: '**You can require the sorting order by adding the following arguments after the command:** \n \t plays \n \t time \n \t skips \n \t offline \n \t skips% \n \t offline% \n \t time%\n *(The commands with the percent sign are a sorting order based on the percentage of the particular categories. If you use the command without this percentage sign you will get it sorted by the concrete number.)*',
                },
                {
                    name: 'More Information',
                    value: '```!help stats Sortingorder```'
                },
                {
                    name: 'required command:',
                    value: '```!stats <sortingorder>```'
                },
            )
            .setColor('#1DB954')
            channel.send({ embeds: [statsembed] })}
            if (argument  === 'stats' && addition === 'Sortingorder') {
                const statsembed = new EmbedBuilder()
                .setTitle(`The Stats Sortingorder`)
                .addFields(
                    {                    
                        name: 'plays, time, skips, offline',
                        value: 'The sorting order is based on the number of plays, time played, skips, offline streams',
                    },
                    {
                        name: 'time%, skips%, offline%',
                        value: 'The sorting order is based on the percentage of the time played, skips, offline streams',
                    },
                )
                .setColor('#1DB954')
                channel.send({ embeds: [statsembed] })
            }
        }
    }
}