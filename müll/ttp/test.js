const mongoose = require('mongoose');

module.exports = async (message) => {
    if (message.content !== 'baum' ) return;
    if (message.author.bot) return;
    if (message.guild.id !== '943955705545760788') return;

    const Players = mongoose.models['tplayerst'];

    const player11 = await Players.findOne({accesID: "0001"});
    if (player11) {
      player11.player2.inventar.push('Inder');
      await player11.save();
    console.log(player11.player2.inventar);
    }
}