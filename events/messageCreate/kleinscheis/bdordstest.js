const Filter = require('bad-words');
const filter = new Filter();

module.exports = (message) => {
    const text = message.content;
    if (message.author.bot) return;
    if (filter.isProfane(text)) {
        message.reply('Bitte keine Schimpfwörter!'); 
        message.reply('kann auch gut sein, dass das keins War lul :)')
    }
}
