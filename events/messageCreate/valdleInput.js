
const Valdle = require("../../schemas/valdle"); // ggf. Pfad anpassen

module.exports = (message, instance) => {
    const regex = /Valdle\s+#(?<day>\d+):\s+🕵️\s+Agent:\s+(?<agent>\d+)\s+🗺️\s+Map:\s+(?<map>\d+)\s+🏆\s+Rank:\s+(?<rank>\d+)\s+✨\s+Ability:\s+(?<ability>\d+)\s+🔫\s+Weapon:\s+(?<weapon>\d+)\s+💬\s+Quote:\s+(?<quote>\d+)/;

    const match = message.content.match(regex);
    if (message.channel.id !== "1383460126496788641") return;

    if (match && match.groups) {
    const {
        day,
        agent,
        map,
        rank,
        ability,
        weapon,
        quote
    } = match.groups;

    const valdleData = {
        userId: message.author.id,
        day: Number(day),
        agent: Number(agent),
        map: Number(map),
        rank: Number(rank),
        ability: Number(ability),
        weapon: Number(weapon),
        quote: Number(quote)
    };

    //console.log(valdleData); // Jetzt hast du ein sauberes Objekt
    Valdle.create(valdleData)
        .then(() => {
            console.log('Valdle-Daten erfolgreich gespeichert:', valdleData);
        })
        .catch(err => {
            console.error('Fehler beim Speichern der Valdle-Daten:', err);
        });
    message.react('✅');

    }
}