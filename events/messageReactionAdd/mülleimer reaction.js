module.exports = async (messageReaction, user, instance) => {
  if (user.bot) return; 
  if (messageReaction.emoji.name === '🗑️') {
    try {
      await messageReaction.message.delete();
    } catch (error) {
      console.error(`Error deleting message: ${error}`);
    }
  }
}