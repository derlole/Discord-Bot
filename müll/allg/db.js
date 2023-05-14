
const { strict } = require('assert');
const mongoose = require('mongoose');

module.exports =  async (message, instance) => {
    if (message.content === '!db') {
    (async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to daadebang!');
    })
    ().catch((err) => console.error(err));
    message.reply('Nö');

    }
}
