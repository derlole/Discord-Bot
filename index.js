const {
  Client,
  IntentsBitField,
  Partials,
} = require("discord.js")
const { DefaultCommands } = require("wokcommands")
const WOK = require("wokcommands")
const path = require("path")

const config = require("./config.json")

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
})

client.on("ready", () => {
  console.log("Ready!")
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    events: {
      dir: path.join(__dirname, "events"),
    },
    testServers: [config.testServer],
    botOwners: [config.ownerID, config.xyzyxID],
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

client.login("MTA4MDA2NzY3MDU2Njc2NDU0NA.GEG-g8.pMF8_T6bYKVRD0oe_76kOWA2YbjD_0AWuySROA"/*process.env["Token"]*/)