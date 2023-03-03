module.exports = (message, instance) => {
  if (message.content.includes ("Minecraft") && //message.guild.id === "849905679271329803"
      message.channel.id === "849906014030659604"
      ) {
    message.reply("Das ist tolles Spiel und sollte auf jedem Gerät Installiert und gespielt werden!")
  }
}