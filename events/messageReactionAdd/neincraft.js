module.exports = (messageReaction, instance) => {
  console.log("funzt n bissl")
  if (messageReaction === messageReaction.message.guild.cache.get("1080223654488576070") /*&& messageReaction.message.channel.id === "849906014030659604"*/)
    console.log("funzt")
  {
    messageReaction.message.reply("Minecraft ist toll und sollte auf jedem Gerät Installiert und gespielt werden!")
  }
}