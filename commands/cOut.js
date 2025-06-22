const { CommandType } = require("wokcommands")
const Valdle = require("../schemas/valdle"); // ggf. Pfad anpassen

module.exports = {
    description: 'Evaluate the valdle',
    type: CommandType.LEGACY,
    minArgs: 1,
    expectedArgs: "n",

    callback: ({args, channel}) => {
        //return channel.send('This command is currently disabled')
        if (channel.id !== "1383460126496788641") return channel.send({
            content: "Dieser Befehl kann hier nicht verwendet werden.",
            ephemeral: true,
        });
        const n = parseInt(args[0]);
        

        if (isNaN(n))
            return channel.send('Bitte gib eine Zahl ein');
        if (n < 710)
            return channel.send('DIE DATENBANK-INTEGRITÄT IST DURCH DEINE DUMMHEIT GEFÄRDET!!!');
        Valdle.find({ day: n }).then(entries => {
            if (!entries || entries.length === 0) {
                return channel.send(`Keine Einträge für #${n} gefunden.`);
            }



            // Felder, die ausgewertet werden sollen
            // Für jeden Nutzer den Durchschnitt aller Felder berechnen
            const fields = ["agent", "map", "rank", "ability", "weapon", "quote"];
            const userAverages = {};

            entries.forEach(entry => {
                const user = entry.user || entry.userId || "Unbekannt";
                const sum = fields.reduce((acc, field) => acc + (entry[field] || 0), 0);
                const avg = sum / fields.length;
                userAverages[user] = avg;
            });

            // Nutzer nach Durchschnitt aufsteigend sortieren (niedrigste zuerst)
            const sorted = Object.entries(userAverages)
                .sort((a, b) => a[1] - b[1])
                .slice(0, 3);

            // Top 3 Nutzer formatieren
            const result = sorted.map(([user, avg], i) => `${i + 1}. ${'<@'+ user + '>'}: ${avg.toFixed(2)}`).join('\n');

            channel.send(`Top 3 Nutzer mit niedrigstem Durchschnitt:\n${result}`);
            channel.send(`Gefundene Einträge für #${n}: ${entries.length}`);



        }).catch(err => {
            console.error(err);
            channel.send('Fehler beim Abrufen der Datenbankeinträge.');
        });

    }
}