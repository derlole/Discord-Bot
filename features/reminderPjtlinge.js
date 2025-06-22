
const CHANNEL_ID = "1381688404873445476";
let countThatIsHaesslich = 13;

function scheduleTask(client) {
  setInterval(async () => {
    const now = new Date();
    const day = now.getDay(); 

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
        console.error("❌ Channel nicht gefunden!");
        return;
    }

    // Prüfe Uhrzeit abhängig vom Wochentag
    const targetHour = (day === 1 || day === 3) ? 19 : 17;

    if (now.getHours() === targetHour && now.getMinutes() === 30) {
      channel.send(`Erinnerung: Bitte Pjtlinge in 30min füttern! 🐟 \nHeute Johannes ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
    }
    if (now.getHours() === targetHour && now.getMinutes() === 50) {
      channel.send(`Erinnerung: Bitte Pjtlinge in 10min füttern! 🐟 \nHeute Johannes ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
    }
    if (now.getHours() === (targetHour + 1) && now.getMinutes() === 0) {
      channel.send(`Erinnerung: Bitte Pjtlinge jetzt füttern! 🐟 \nHeute Johannes ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
      countThatIsHaesslich++;
    }
  }, 60 * 1000);
}

module.exports = (instance, client) => {
  console.log("Starting Pjtlinge reminder task...");
  return
  scheduleTask(client);
}