const { CommandType } = require("wokcommands")
const { EmbedBuilder } = require("discord.js")

module.exports = {
  description: "show and delete your slash commands",
  type: CommandType.SLASH,
  ownerOnly: true,
  options: [
    {
      name: "name",
      description: "the name of the command you want to delete",
      type: 3,
      required: false,
    },
  ],

  callback: async ({ interaction, client, guild }) => {
    if (!interaction.options.getString("name")) {
      const commands = await client.application.commands.fetch()
      if (!commands) return { content: "No commands found", ephemeral: true }
      const embed = new EmbedBuilder().setTitle("Slash commands").setDescription(
        commands
          .map((command) => {
            return `**${command.name}** - ${command.description}`
          })
          .join("\n")
      )
      return { embeds: [embed] }
    } else {
      const commands = await client.application.commands.fetch()
      const name = interaction.options.getString("name")
      const commandToDelete = commands.find((command) => command.name === name)
      if (!commandToDelete) return { content: "Command not found", ephemeral: true }
      await commandToDelete.delete()
      return { content: `Deleted command \`${name}\``, ephemeral: true }
    }
  },
}