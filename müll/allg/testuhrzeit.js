

module.exports = (message) => {
    if (message.content === '!uhrzeit') {
        const currentTime = new Date().toLocaleTimeString();
        message.reply( `Es ist gerade ${currentTime}`);
    }
}