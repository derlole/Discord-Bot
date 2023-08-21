const mongoose = require('mongoose');

module.exports = async (message, user) => {
    if(message.content === "resetttpPlayers" && message.author.id === "702427586822930493") {
        var Players = mongoose.models['tplayerst'];

            var playerModele = await Players.findOne({accesID: "0001"});
            playerModele.player1.name = 'none';
            playerModele.player1.charakter = 'none';
            playerModele.player2.name = 'none';
            playerModele.player2.charakter = 'none';
            playerModele.player3.name = 'none';
            playerModele.player3.charakter = 'none';
            playerModele.player4.name = 'none';
            playerModele.player4.charakter = 'none';
            playerModele.player5.name = 'none';
            playerModele.player5.charakter = 'none';
            playerModele.player6.name = 'none';
            playerModele.player6.charakter = 'none';
            playerModele.player7.name = 'none';
            playerModele.player7.charakter = 'none';
            playerModele.player8.name = 'none';
            playerModele.player8.charakter = 'none';
            playerModele.player9.name = 'none';
            playerModele.player9.charakter = 'none';
            playerModele.player10.name = 'none';
            playerModele.player10.charakter = 'none';
            playerModele.player11.name = 'none';
            playerModele.player11.charakter = 'none';
            playerModele.player12.name = 'none';
            playerModele.player12.charakter = 'none';
            playerModele.save();
            message.channel.send("reseted");
    }
}