const { ActivityType } = require("discord.js")

module.exports = (instance, client) => {
    client.user.setActivity("derlole", { type: ActivityType.Listening })
}