const { CommandType } = require("wokcommands");

module.exports = {
  description: 'Deletes all messages after a certain message the bot reacted to with a specific emoji',
  type: CommandType.SLASH,
  options: [
    {
      name: "messageid",
      description: 'The ID of the message to react to and delete messages after',
      type: 3,
      required: true,
    },
  ],
  //ownerOnly: true,
callback: async ({ interaction, channel }) => {
    const emoji = '🗑️';
    const afterMessageID = interaction.options.getString("messageid");
  return afterMessageID
    const afterMessage = await channel.messages.fetch(afterMessageID);
    if (!afterMessage) return 'Could not find a message with this ID.'
    afterMessage.react(emoji);
  
    const filter = (reaction, user) => {
      return reaction.emoji.name === emoji && user.id === interaction.member.id
    }
    const collector = afterMessage.createReactionCollector({ filter, time: 60000 });
    collector.on('collect', async () => {
      const messages = await channel.messages.fetch({ after: afterMessageID })
      messages.set(afterMessageID, afterMessage)
      channel.bulkDelete(messages, true)
      collector.stop()
      return { content: "Messages deleted", ephemeral: true}
    });
  },
};