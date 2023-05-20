const mongoose = require('mongoose');

const player = {
    name:{type:String, default: 'none'}, 
    charakter:{type:String, default: 'none'}, 
    health:{ type: Number, default: 100}, 
    fightpoints:{ type: Number, default: 100}, 
    inventar:{type: Array, default: []},
};
const ttpPlayer = new mongoose.Schema({
    accesID: {type: String, required: true},
    player1: player,
    player2: player,
    player3: player,
    player4: player,
    player5: player,
    player6: player,
    player7: player,
    player8: player,
    player9: player,
    player10: player,
    player11: player,
    player12: player,
});
const Players = mongoose.model('tplayerst', ttpPlayer);

module.exports = async (message) => {
    if (message.content === 'initplayer' && message.author.username === "derlole") {
    if (message.author.bot) return;
    if (message.guild.id !== '943955705545760788') return;

    (async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
    })
    try {
        const newPlayer = new Players({
            accesID: '0001',
        });
        await newPlayer.save();
        console.log('Resetted datasystem syved');
    }
    catch (err) {
        console.log(err);
    }
}
}