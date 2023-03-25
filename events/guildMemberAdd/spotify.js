const { PermissionOverwrites, ChannelType } = require("discord.js");

module.exports = (member, instance) => {
    console.log("ahh")
    if (member.guild.id === '1089153627643449436') {
        console.log("ahhhh")
        const server = member.client.guilds.cache.get("1089153627643449436")
        server.channels.create({
            name:"test",
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: member.guild.id,
                    deny: [PermissionOverwrites.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: member.id,
                    allow: [PermissionOverwrites.FLAGS.VIEW_CHANNEL]
                }]
        })
        server.channels.create({
            name:"test",
            type: ChannelType.GuildText,
            parent: "test",
            permissionOverwrites: [
                {
                    id: member.guild.id,
                    deny: [PermissionOverwrites.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: member.id,
                    allow: [PermissionOverwrites.FLAGS.VIEW_CHANNEL]
                }]
        })
        channel.send(`Hey ${member}, willkommen auf dem Server!`)
    }
}
