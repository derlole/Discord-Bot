module.exports = (message, instance) => {
  if (message.content === "Spiel" && message.channel.id === "1080246577702109304") {
    message.member.roles.add(message.guild.roles.cache.get("1080246751627321454"))
    message.reply("Se am se rolle Spiele")
    console.log("Rolle Spiele vergeben")
  }
}