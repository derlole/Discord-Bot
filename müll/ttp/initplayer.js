const mongoose = require('mongoose');

const ttpPlayer = new mongoose.Schema({
    name: {type:String, required: true},
    health: { type: Number, default: 100},
    mana: { type: Number, default: 100},

});
const Players = mongoose.model('Players', ttpPlayer);

module.exports = async (message) => {
    if (message.content !== 'initplayer') return;
    if (message.author.bot) return;
    if (message.guild.id !== '943955705545760788') return;

    (async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
    })
    const player = await Players.findOne({name: message.author.username});
    if (player) {
        message.channel.send('Du hast schon einen Charakter');
        return;
    }
    else {
        const newPlayer = new Players({
            name: message.author.username,
        });
        await newPlayer.save();
        console.log('Saved player to database');
    }
}