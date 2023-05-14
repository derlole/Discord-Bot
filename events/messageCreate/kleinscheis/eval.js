const config = require('../../../config.json')
const { inspect } = require('util')

module.exports = (message) => {
  if (message.content.startsWith(`${config.Prefix}eval `)) {
      const code = message.content.replace(`${config.Prefix}eval `, '')
      if(message.author.id === config.ownerID) {
          try {
              const result = eval(code)
              message.channel.send(`✅ Evaluated Successfully\n\`\`\`js\n${inspect(result, { depth: 0 })}\n\`\`\``)
          } catch(err) {
              message.channel.send(`❌ Evaluated Failed\n\`\`\`js\n${err}\n\`\`\``)
          }
      }
  }
}