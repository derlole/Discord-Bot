const { Client, IntentsBitField, Partials } = require("discord.js")
const { DefaultCommands } = require("wokcommands")
const WOK = require("wokcommands")
const path = require("path")
const mongoose = require("mongoose")
const fs = require("fs")  // Hier fügen wir fs für das Logging hinzu

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
    IntentsBitField.Flags.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
})

function getEventFiles(dir) {
  let eventFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Wenn es ein Ordner ist, rekursiv den Ordner durchsuchen
      eventFiles = eventFiles.concat(getEventFiles(filePath));
    } else if (file.endsWith(".js")) {
      // Wenn es eine .js-Datei ist, zum Event-Array hinzufügen
      eventFiles.push(filePath);
    }
  });

  return eventFiles;
}
client.on("ready", async () => {
  console.log("Ready!")
  /*
  const eventFilesPath = path.join(__dirname, "events");
  const eventFiles = getEventFiles(eventFilesPath);
  console.log("Geladene Event-Dateien:", eventFiles);

  eventFiles.forEach(file => {
    const event = require(file);
    const eventName = path.basename(file, ".js");  

    if (typeof event === 'function') {
      client.on(eventName, event);
      console.log(`Event "${eventName}" erfolgreich geladen.`);
    } else {
      console.log(`Fehler: Event "${eventName}" ist keine Funktion!`);
    }
  });
*/

  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    events: {
      dir: path.join(__dirname, "events"),
    },
    testServers: [config.testServer, config.hiServer, '1125432139895279676', '943955705545760788'],
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