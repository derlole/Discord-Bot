module.exports = (message, instance) => {
    if (message.content.includes ('🇷🇺') && message.guild.id === "849905679271329803"
        ) {
      message.react('🗑️')
    }
  }