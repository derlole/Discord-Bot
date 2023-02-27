const path = require('path')
const { Client } = require('discord.js')
const wokcommands = require('wokcommands')
const keepAlive = require('./server.js')

const config = require('./config.json')

const client = new Client({intents: 98303})

client.on('ready', () => {
    client.user.setActivity("SUBNAUTICA", {type: "PLAYING"})

    new wokcommands(client, {
        youtubeDL: false,
        showWarns: false,
        commandsDir: path.join(dirname, 'commands'),
        featuresDir: path.join(dirname, 'features'),
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
    .setDefaultPrefix(config.Prefix)
})

client.login(process.env['Token'])
keepAlive()