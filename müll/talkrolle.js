module.exports = (message, instance) => {
  if (message.content === "Talk" && message.channel.id === "1080246577702109304") {
    message.member.roles.add(message.guild.roles.cache.get("1080246604524699788"))
    message.reply("Se am se rolle Talktiv")
    console.log("Rolle Talktiv vergeben")
  }
}