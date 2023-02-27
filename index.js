const { Client } = require('discord.js')
const config = require('./config.json')
const client = new Client({intents: 98303})
client.on('ready', () => {
    client.user.setActivity("SUBNAUTICA", {type: "PLAYING"})
    console.log("WWWWWOOOOOOOOOWWWWWW")
})
client.login(config.token)