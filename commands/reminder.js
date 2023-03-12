const { CommandType } = require("wokcommands")

module.exports = {
  description: "set a reminder",
  type: CommandType.SLASH,
  options: [
    {
      name: "time",
      description: "time to wait before reminding you",
      type: 3,
      required: true,
    },
    {
      name: "request",
      description: "what you want to be reminded of",
      type: 3,
      required: true,
    },
    {
      name: "user",
      description: "user to remind",
      type: 6,
      required: true,
    },
    {
      name: "importance",
      description: "how important is this reminder?",
      type: 3,
      required: false,
    },
  ],

  callback: async ({ interaction, channel }) => {
    const time = interaction.options.getString("time")
    const request = interaction.options.getString("request")
    const user = interaction.options.getUser("user")
    const importance = interaction.options.getString("importance")

    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!regex.test(time)) return { content: "Invalid time format. Please use HH:MM format.", ephemeral: true }

    const [hours, minutes] = time.split(":")

    const reminderTime = new Date()
    reminderTime.setFullYear(1970)
    reminderTime.setMonth(0)
    reminderTime.setDate(1)
    reminderTime.setHours(hours)
    reminderTime.setMinutes(minutes)
    reminderTime.setSeconds(0)
    reminderTime.setMilliseconds(0)

    console.log(reminderTime.getTime())

    interaction.reply({ content: "Reminder set!", ephemeral: true })
    setTimeout(() => {
      channel.send(`<@${user.id}>\nErinnerung: ${request}\n(Wichtigkeit: ${importance})`)
    }, reminderTime.getTime())
  },
}