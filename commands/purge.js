const { CommandType } = require("wokcommands")

module.exports = {
  description: 'Deletes all messages after a certain message the bot reacted to with a specific emoji',
  type: CommandType.LEGACY,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<message ID>",
  ownerOnly: true,

  callback: async ({ args, message, channel }) => {
    const emoji = '🗑️';
    const afterMessageID = args[0];

    const afterMessage = await message.channel.messages.fetch(afterMessageID);
    if (!afterMessage) return 'Could not find a message with that ID.'
    afterMessage.react(emoji);

    const filter = (reaction, user) => {
      return reaction.emoji.name === emoji && user.id === message.author.id
    }
    const collector = afterMessage.createReactionCollector({ filter, time: 60000 });
    collector.on('collect', async () => {
      const messages = await channel.messages.fetch({ after: afterMessageID })
      messages.set(afterMessageID, afterMessage)
      channel.bulkDelete(messages, true)
      collector.stop()
    });
  },
};