const { CommandType } = require("wokcommands"); // ggf. anpassen
const Book = require("../../schemas/book"); // ggf. Pfad anpassen
const channel = "1381688404873445476"
module.exports = {
  description: 'Loescht ein Buch sofern es vorhanden ist',
  type: CommandType.SLASH,
  options: [
    {
      name: "buch",
      description: "Titel des Buchs",
      type: 3, // STRING
      required: true,
    }
  ],
  category: "lesen",
  //slash: true,

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

    // Beispielantwort / Weiterverarbeitung
    await interaction.editReply({
      content: `📘 **${interaction.user.username}** hat das Buch **"${buch}"** zum Lesen entfernt`
    });

    const deleted = await Book.deleteMany({ titel: buch });
    if (deleted.deletedCount === 0) {
        await interaction.followUp({
            content: `Kein Buch mit dem Titel "${buch}" gefunden.`,
            ephemeral: true,
        });
    } else {
        await interaction.followUp({
            content: `Es wurden ${deleted.deletedCount} Buch/Bücher mit dem Titel "${buch}" gelöscht.`,
            ephemeral: true,
        });
    }

  },
};
