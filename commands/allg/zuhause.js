const { CommandType } = require('wokcommands');


module.exports = {
  description: "Wo ist das Minecraft zuahuse",
  type: CommandType.BOTH,

  callback: () => {
    return {
      content: "DAS MINECRAFT ZUHAUSE IST BEI 30 -300",
    }
  },
} 