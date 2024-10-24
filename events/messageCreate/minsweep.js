const Game = require('../../schemas/game');

module.exports = (message) => {

    if(message.channel.id === "1150763595563544576"){   
            const regex = /^(\d+)\/(\d+)$/;
            const match = message.content.match(regex);
        
            if (match) {
                const firstNumber = parseInt(match[1], 10);
                const secondNumber = parseInt(match[2], 10);
                message.reply(`Current: ${(99-firstNumber)/secondNumber}\nRecord: ${99/125}\nReference: ${(99/125)-(99-firstNumber)/secondNumber}`);
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