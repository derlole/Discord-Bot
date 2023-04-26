const config = require("../.././config.json")

module.exports = (messageReaction, instance) => {
  if (messageReaction.message.content.includes("RUINED") && messageReaction.message.guild.id === config.hiServer) {
    messageReaction.message.reply("Das war jetzt schon schlecht")
  }
}
