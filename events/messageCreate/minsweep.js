const Game = require('../../schemas/game');

module.exports = (message) => {

    if(message.channel.id === "1150763595563544576"){   
            const regex = /^(\d+)\/(\d+)$/;
            const match = message.content.match(regex);
        
            if (match) {
                const firstNumber = parseInt(match[1], 10);
                const secondNumber = parseInt(match[2], 10);
                const record = 99/116;
                message.reply(`Current: ${(99-firstNumber)/secondNumber}\nRecord: ${record}\nReference: ${record-(99-firstNumber)/secondNumber}\n${((99-firstNumber)/secondNumber)/record*100}%`);
                const game = new Game({
                    time: secondNumber,
                    bombsLeft: firstNumber
                });
                game.save().then(() => console.log('Game saved'));

            } else {
                return 
            }
    }else{
        return
    }

}