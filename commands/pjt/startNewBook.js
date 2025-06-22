const { CommandType } = require("wokcommands"); // ggf. anpassen
const Book = require("../../schemas/book"); // ggf. Pfad anpassen
const channel = "1381688404873445476"
module.exports = {
  description: 'Startet ein neues Buch',
  type: CommandType.SLASH,
  options: [
    {
      name: "buch",
      description: "Titel des Buchs",
      type: 3, // STRING
      required: true,
    },
    {
      name: "anfang",
      description: "Startpunkt (Kapitel)",
      type: 4, // INTEGER
      required: true,
    },
    {
      name: "ende",
      description: "Endpunkt (Kapitel)",
      type: 4, // INTEGER
      required: true,
    },
    {
      name: "today",
      description: "Heute starten? (wenn nein, dann ist es für morgen)",
      type: 5, // BOOLEAN
      required: true,
    },
  ],
  category: "lesen",
  slash: true,

  callback: async ({ interaction }) => {
    if (interaction.channel.id !== channel) return interaction.reply({
      content: "Dieser Befehl kann hier nicht verwendet werden.",
      ephemeral: true,
    });
    try {
      await interaction.deferReply();
    } catch (error) {
      console.log("Fehler beim Defer:", error);
    }

    // Eingaben holen
    const buch = interaction.options.getString("buch");
    const anfang = interaction.options.getInteger("anfang");
    const ende = interaction.options.getInteger("ende");
    const today = interaction.options.getBoolean("today");
    const user = interaction.user;

    // Beispielantwort / Weiterverarbeitung
    await interaction.editReply({
      content: `📘 **${user.username}** hat das Buch **"${buch}"** von ${anfang} bis ${ende} gestartet.\n Startet: ${today ? "heute" : "morgen"}`
    });

    // Optional: Speicherung oder Logging
    console.log({
      userId: user.id,
      buch,
      anfang,
      ende,
      today,
    });
    const startDate = today ? new Date() : new Date(Date.now() + 24 * 60 * 60 * 1000);
    startDate.setHours(0, 0, 0, 0);

    const chapters = ende - anfang + 1;
    const finishDate = new Date(startDate);
    finishDate.setDate(startDate.getDate() + chapters - 1);

    const deleteDate = new Date(finishDate);
    deleteDate.setDate(finishDate.getDate() + 2);

    await Book.create({
      title: buch,
      startChapter: anfang,
      endChapter: ende,
      startDate,
      finishDate,
      deleteDate,
    });
  },
};
