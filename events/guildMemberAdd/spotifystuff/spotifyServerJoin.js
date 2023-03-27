const { permissionOverwrites, PermissionFalgsBits, ChannelType } = require("discord.js");

module.exports = async (member,guild, instance) => {
    console.log(member.guild.id)
    if (member.guild.id === '1089153627643449436') {
        console.log("ahhhh")
            try {
                const server = await guild.client.guilds.fetch('1089153627643449436');
                const category = await server.channels.create({
                    name: 'spotify-statistik',
                    type:  ChannelType.GuildCategory,
            });
            const helpchhannel = await server.channels.create({
                name:'help',
                type: ChannelType.GuildText,
                parent: category.id,
            });
            helpchhannel.send(`Hey ${member}, willkommen auf dem Server! Akzeptiere die Nutzungsbedingungen und nutze dann **!help** für die ersten Schritte`)
        
            const channel = await server.channels.create({
                name:'Statistik von ' + member.user.username,
                type: ChannelType.GuildText,
                parent: category.id,
            });
            channel.send(`Hier kannst du die Befehle für deine Spotify-Statistiken auswerten.`)
            }
        catch (error) {
            console.log(error)
        }
    }
}
