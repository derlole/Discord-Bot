const regex = /\*([^\*]+)\*/;

module.exports = (message, instance) => {
  if (message.channel.id === '1079807642639290510') {
  }
  if (regex.exec(message.content)) {
    const quotedText = regex.exec(message.content)[1];
  message.reply(quotedText)
  }
}