module.exports = (messageReaction, user, instance) => {
 
  if (messageReaction.emoji.id === '1066419469938868285' && messageReaction.message.guild.id === '849905679271329803') {
    messageReaction.message.react('1066419469938868285')
  }
}