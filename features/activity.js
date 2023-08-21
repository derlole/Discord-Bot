const { ActivityType } = require("discord.js")

module.exports = (instance, client) => {
    client.user.setActivity("derloleherrschaft", { type: ActivityType.Playing })
}