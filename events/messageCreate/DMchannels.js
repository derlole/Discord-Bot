

const { PermissionOverwrites, ChannelType } = require("discord.js");

module.exports =  async (message, instance) => {
  if (message.channel.type === 1){
    const server = message.client.guilds.cache.get('1080867857652527184')
    const name = message.author.username.replace(/\s+/g, "-").toLowerCase()
    const targetChannel = server.channels.cache.find(channel => channel.name === name)
    const dmMessage = message.content
    if (targetChannel) {
         targetChannel.send(`Nachricht von ${message.author.tag}: ${dmMessage}` )
    } else {
      server.channels.create({
        name: name,
        type: ChannelType.GuildText,
        parent: '1080879210710708254',
      }).then(channel => channel.send(`Nachricht von ${message.author.tag}: ${dmMessage}`))
    }
  }
}
    