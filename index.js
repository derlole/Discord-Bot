const { Client, IntentsBitField, Partials } = require("discord.js")
const { DefaultCommands } = require("wokcommands")
const WOK = require("wokcommands")
const path = require("path")
const mongoose = require("mongoose")

require('dotenv').config()
const keepAlive = require("./server.js")
const config = require("./config.json")

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildPresences,
  ],
  partials: [Partials.Channel],
})



client.on("ready", async () => {
  console.log("Ready!")
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    events: {
      dir: path.join(__dirname, "events"),
    },
    testServers: [config.testServer, config.hiServer],
    botOwners: [config.ownerID, config.xyzyxID, config.guestOwnerID],
    disabledDefaultCommands: [
      DefaultCommands.ChannelCommand,
      DefaultCommands.CustomCommand,
      DefaultCommands.Prefix,
      DefaultCommands.RequiredPermissions,
      DefaultCommands.RequiredRoles,
      DefaultCommands.ToggleCommand,
    ],
  })
})

client.login(process.env.TOKEN || process.env["Token"])
keepAlive()