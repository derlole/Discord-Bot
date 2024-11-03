module.exports = (message, instance) => {
  if (message.content.includes ('1078819309004017755') && message.guild.id === "849905679271329803"
      ) {
    message.react(':wastebasket:')
  }
}