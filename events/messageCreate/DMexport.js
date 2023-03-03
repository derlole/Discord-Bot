const { ChannelType } = require("discord.js")

module.exports = async (message, instance) => {
  if (message.channel.type === 1 && message.author.id !== "1080067670566764544") {
    const server = message.client.guilds.cache.get("1080867857652527184")
    const name = message.author.username.replace(/\s+/g, "-").toLowerCase()
    const targetChannel = server.channels.cache.find((channel) => channel.name === name)
    if (targetChannel) {
      targetChannel.send(`**Nachricht von ${message.author.tag}:** ${message.content}`)
    } else {
      server.channels
        .create({
          name: name,
          type: ChannelType.GuildText,
          parent: "1080879210710708254",
        })
        .then((channel) => channel.send(`**Nachricht von ${message.author.tag}:** ${message.content}`))
    }
  }
}
