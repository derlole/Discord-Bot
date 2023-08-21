module.exports = async (messageReaction, user, guild) => {
    if (user.bot) return;

    if (user.id === "702427586822930493"  && messageReaction.emoji.name === '🇷🇺') {
      try {
        await messageReaction.remove();
      } catch (error) {
        console.error(`Error deleting message: ${error}`);
      }
  }
}