module.exports = (messageReaction, instance) => {
  console.log("funzt n bissl")
  if (messageReaction.emoji === '👍' /*&& messageReaction.message.channel.id === "849906014030659604"*/)
    console.log("funzt")
  {
    messageReaction.message.reply("Minecraft ist toll und sollte auf jedem Gerät Installiert und gespielt werden!")
  }
}