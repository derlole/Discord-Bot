const { CommandType } = require("wokcommands")

module.exports = {
  description: "Stel Gespreksstatus in",
  type: CommandType.SLASH,
  options: [
    {
      name: "status",
      description: "ben je klaar of weg?",
      type: 3,
      required: true,
            choices: [
        {
          name: "Anwesend",
          value: "ready"
        },
        {
          name: "Abwesend",
          value: "away"
        }
      ]
    },
    {
      name: "duration",
      description: "hoe lang ben je beschikbaar",
      type: 3,
      required: false,
    },
    {
      name: "userrequest",
      description: "gebruiker te praten",
      type: 4,
      required: false,
    },
  ],

  callback: async ({interaction, channel }) => {
    const status = interaction.options.getString("status")
    const duration = interaction.options.getString("duration")
    const userID = interaction.options.getUser("userrequest")
    if (status === "ready") {
      const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!regex.test(duration)) return { content: "Invalid time format. Please use HH:MM format.", ephemeral: true }


    const [hours, minutes] = duration.split(":")
    const reminderTime = new Date()
    
    reminderTime.setHours(hours)
    reminderTime.setMinutes(minutes)
    reminderTime.setSeconds(0)
    reminderTime.setMilliseconds(0)
      
    console.log(reminderTime.getTime())
    interaction.reply({ content: "Talk anwesenheit aktualisiert", ephemeral: true })
      channel.send(`<@${interaction.user.id}> ist für: ${duration} im talk anwesend!`)
            if(userID){
              console.log("geht")
        channel.send(`<@${userID.id}>`)
      }
    }
    if (status === "away") {
      
    interaction.reply({ content: "Talk anwesenheit aktualisiert", ephemeral: true })
      channel.send(`<@${interaction.user.id}> hat sich für heute aus dem Talk abgemeldet`)
      
    }
  }
}
