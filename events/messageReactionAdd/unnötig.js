module.exports = async (messageReaction, user, guild) => {
    if (user.bot) return;
    console.log(guild.id)
    
    if (user.id === "702427586822930493"  && messageReaction.emoji.name === '🇷🇺') {
        console.log("hi")
      try {
        await messageReaction.remove();
      } catch (error) {
        console.error(`Error deleting message: ${error}`);
      }
  }
}