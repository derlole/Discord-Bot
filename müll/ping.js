// events/messageCreate.js

module.exports = {
    name: "messageCreate",
    execute(message) {
      if (message.content === "!ping") {
        message.reply("Pong!");
      }
    }
  };
  