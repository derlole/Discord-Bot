const { Client, IntentsBitField, Partials } = require("discord.js")
const { DefaultCommands } = require("wokcommands")
const WOK = require("wokcommands")
const path = require("path")

const config = require("./config.json")

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.MessageContent],
  partials: [Partials.Channel],
})

client.on("ready", () => {
  console.log("Ready!")
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    events: {dir: path.join(__dirname, "events")},
    testServers: [config.testServer],
    botOwners: [config.ownerID, config.xyzyxID],
    disabledDefaultCommands: [
      DefaultCommands.ChannelCommand,
      DefaultCommands.CustomCommand,
      DefaultCommands.Prefix,
      DefaultCommands.RequiredPermissions,
      DefaultCommands.RequiredRoles,
      DefaultCommands.ToggleCommand
    ],
  })
})

client.login("MTA3OTgwNjIxNjA0MzI0MTU0Mg.GSWx9J.dzlf8Y6w4RWwDivTEsJRfyRMZae7_xHJnvQvCs")
