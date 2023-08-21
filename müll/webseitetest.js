const express = require('express');

const app = express();

module.exports = (message) => {
    if (message.content === '!webseite') {
        const webLink = 'https://test-lol-bot.com:5500/';
        message.channel.send(`Hier ist die Webseite: ${webLink}`);
    }
}

app.get('/', (req, res) => {
    res.send('Lel');
});

app.listen(5500, () => {
    console.log('webseite ready');
});
