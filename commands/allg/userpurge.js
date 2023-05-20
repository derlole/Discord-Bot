const { CommandType } = require("wokcommands");

module.exports = {
description: 'Deletes all messages from a certain user after a certain message the bot reacted to with a specific emoji',
  type: CommandType.LEGACY,
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<message ID> <user ID>",
  ownerOnly: true,

    callback: async ({ args, message, channel }) => {
      const emoji = '🗑️';
      const afterMessageID = args[0];
      const userID = args[1];
      const afterMessage = await message.channel.messages.fetch(afterMessageID);
      
      if (!afterMessage) return 'Could not find a message with that ID.';
      afterMessage.react(emoji);

      const filter = (reaction, user) => {
        return reaction.emoji.name === emoji && user.id === message.author.id;
      };

      const collector = afterMessage.createReactionCollector({ filter, time: 60000 });
      collector.on('collect', async () => {
        const messages = await channel.messages.fetch({ after: afterMessageID });
        const userMessages = messages.filter(m => m.author.id === userID);
        channel.bulkDelete(userMessages, true);
        collector.stop();
      });
  },
};