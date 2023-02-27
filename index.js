const path = require('path')
const { Client, IntentsBitField, Partials } = require("discord.js")
const wokcommands = require('wokcommands')
const keepAlive = require('./server.js')

const config = require('./config.json')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  client.user.setActivity("SUBNAUTICA", { type: "PLAYING" })

  new wokcommands({
    client,
    youtubeDL: false,
    showWarns: false,
    commandsDir: path.join(__dirname, 'commands'),
    //featuresDir: path.join(__dirname, 'features'),
    testServers: ['1079807641896890488'],
    disabledDefaultCommands: [
      'command',
      'language',
      'prefix',
      'requiredrole',
      'channelonly'
    ],
    botOwners: [config.ownerID],
  })

})

client.login(process.env['Token'])
keepAlive()