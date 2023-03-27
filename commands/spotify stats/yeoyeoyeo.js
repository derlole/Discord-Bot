const { CommandType } = require("wokcommands")
const { EmbedBuilder, embedLength } = require('discord.js');


module.exports = {
    description: 'Give possible Spotify-command oportunities',
    type: CommandType.LEGACY,
    minArgs: 0,
    expectedArgs: "",

    callback: ({channel}) => {
        //return channel.send('This command is currently disabled')
        const embed = new EmbedBuilder()
        .setTitle(`Anything`)
        .addFields(
            {
                name: 'Yeoyeoyeo',
                value: 'leeeeeeel'
            },            
        ) 
        channel.send({ embeds: [embed],})
    }
}