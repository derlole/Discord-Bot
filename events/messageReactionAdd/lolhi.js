const config = require("../.././config.json")

module.exports = (messageReaction, instance) => {
  if (messageReaction.emoji.id === '1080595912855933100' && messageReaction.message.guild.id === config.hiServer)
  {
    messageReaction.message.reply("Das wort Neincraft existiert nicht, dennoch sollte man sich Minecraft runterladen und Spielen!").then(m => m.react("985648174645518356"))
  }
}