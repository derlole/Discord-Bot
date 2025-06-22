
const CHANNEL_ID = "1381688404873445476";
const Book = require("../schemas/book"); // ggf. Pfad anpassen

function scheduleTask(client) {
  setInterval(async () => {

    const now = new Date();
    const nowNoEdit = new Date();
    const day = now.getDay(); 

    // Alle Books holen
    const books = await Book.find({});
    let countThatIsHaesslich = 0;
    let todayChapters = [];

    for (const book of books) {
      // Prüfen, ob heute das deleteDate ist
      if (book.deleteDate) {
        const deleteDate = new Date(book.deleteDate);
        if (
          deleteDate.getFullYear() === now.getFullYear() &&
          deleteDate.getMonth() === now.getMonth() &&
          deleteDate.getDate() === now.getDate()
        ) {
          await Book.deleteOne({ _id: book._id });
          continue;
        }
      }

      // Prüfen, ob heute gelesen wird
      if (book.startChapter && book.endChapter && book.startDate) {
        const startDate = new Date(book.startDate);
        const totalDays = (book.endChapter - book.startChapter + 1);
        const dayDiff = Math.floor(
          (now.setHours(0,0,0,0) - startDate.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
        );
        if (dayDiff >= 0 && dayDiff < totalDays) {
          const chapterToday = book.startChapter + dayDiff;
          todayChapters.push(`${book.title}: Kapitel ${chapterToday}`);
          countThatIsHaesslich++;
        }
      }
    }

    if (todayChapters.length > 0) {
        countThatIsHaesslich = ``;
        countThatIsHaesslich += ` ${todayChapters.join(", ")}`;
    }

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
        console.error("❌ Channel nicht gefunden!");
        return;
    }

    const targetHour = (day === 1 || day === 3) ? 19 : 17;
    //console.log(nowNoEdit.getHours(), nowNoEdit.getMinutes(), targetHour, day, countThatIsHaesslich, nowNoEdit);
    if (nowNoEdit.getHours() === targetHour && nowNoEdit.getMinutes() === 30) {
      channel.send(`Erinnerung: Bitte Pjtlinge in 30min füttern! 🐟 \nHeute ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
    }
    if (nowNoEdit.getHours() === targetHour && nowNoEdit.getMinutes() === 50) {
      channel.send(`Erinnerung: Bitte Pjtlinge in 10min füttern! 🐟 \nHeute ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
    }
    if (nowNoEdit.getHours() === (targetHour + 1) && nowNoEdit.getMinutes() === 0) {
      channel.send(`Erinnerung: Bitte Pjtlinge jetzt füttern! 🐟 \nHeute ${countThatIsHaesslich} \n<@1186631201251926048> <@738480351046795305> <@702427586822930493>`);
      countThatIsHaesslich++;
    }
  }, 60 * 1000);
}

module.exports = (instance, client) => {
    console.log("Starting...");
    scheduleTask(client);
}