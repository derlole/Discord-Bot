const { CommandType } = require('wokcommands');


module.exports = {
  description: "Lea schaut eindeutig zu viel Tiktok",
  type: CommandType.BOTH,

  callback: () => {
    return {
      content: "<@779102543388475412>... Schau nicht so viel Tiktok!!!!!!!!!!!",
    }
  },
} 