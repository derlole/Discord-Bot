module.exports = (message, instance) => {
  if (message.author.id === '808633889508818965' && message.channel.id === '1107567230536921139') {
    setTimeout(() => {
      message.reply('Hallo!')
    }, 60 * 1000)
  }

}