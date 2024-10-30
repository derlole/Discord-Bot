const e = require('express');
const Game = require('../../schemas/game');
const regression = require('regression');

module.exports = async(message) => {

    if(message.channel.id === "1150763595563544576"){   
            const regex = /^(\d+)\/(\d+)$/;
            const match = message.content.match(regex);
            const games = await Game.find({});
            const record = 99/116;
        
            if (match) {
                const firstNumber = parseInt(match[1], 10);
                const secondNumber = parseInt(match[2], 10);
                const times = games.map(game => game.time);
                const bombs = games.map(game => game.bombsLeft);
                const played = games.length;
                const current = (99-firstNumber)/secondNumber;
                let pTrough = 0;
                for (let i = 0; i < bombs.length; i++) {
                    if(bombs[i] == 0 ){
                        pTrough++
                    }
                }
                const pNTrough = played - pTrough;
                var values =[];
                for (let i = 0; i < times.length; i++) {
                    values.push((99-bombs[i])/times[i])
                }
                const stackedForRegressiontb = games.map( game => [game.bombsLeft, game.time]);
                const stackedForRegressionvt = games.map( (game, i) => [values[i], game.time]);
                const stackedForRegressionvb = games.map( (game, i) => [values[i], game.bombsLeft]);
                const rFunctb = regression.linear(stackedForRegressiontb, { precision: 15}).equation;
                const rFuncvt = regression.polynomial(stackedForRegressionvt, {order: 3 }).equation;
                const rFuncvb = regression.polynomial(stackedForRegressionvb, {order: 5 }).equation;
                const valueRefrFunctb = rFunctb[0] * firstNumber + rFunctb[1];
                const valueRefrFuncvt = rFuncvt[0] * current**3 + rFuncvt[1] * current**2 + rFuncvt[2] * current + rFuncvt[3];
                const valueRefrFuncvb = rFuncvb[0] * current**5 + rFuncvb[1] * current**4 + rFuncvb[2] * current**3 + rFuncvb[3] * current**2 + rFuncvb[4] * current + rFuncvb[5];
                let backFunctb
                let backFuncvt
                let backFuncvb
                if (valueRefrFunctb > secondNumber){
                    backFunctb = "You are below the regression line from the tb-Graph. Therefore you are better than the average expection of a game.";
                }else if(valueRefrFunctb < secondNumber){
                    backFunctb = "You are above the regression line from the tb-Graph. Therefore you are worse than the average expection of a game.";
                }else{
                    backFunctb = "You are exactly on the regression line from the tb-Graph. Therefore you are exactly on the average expection of a game. (error)";
                }
                if (valueRefrFuncvt > firstNumber){
                    backFuncvt = "You are below the regression line from the vt-Graph.";
                }else if(valueRefrFuncvt < firstNumber){
                    backFuncvt = "You are above the regression line from the vt-Graph.";
                }else{
                    backFuncvt = "You are exactly on the regression line from the vt-Graph. (error)";
                }
                if (valueRefrFuncvb > current){
                    backFuncvb = "You are below the regression line from the vb-Graph.";
                }else if(valueRefrFuncvb < current){
                    backFuncvb = "You are above the regression line from the vb-Graph.";
                }else{
                    backFuncvb = "You are exactly on the regression line from the vb-Graph. (error)";
                }


                message.reply(`Current: ${current}\nRecord: ${record}\nReference: ${record-current}\n${(current)/record*100}%\n You have played ${played} games, ${pTrough} troughs and ${pNTrough} not troughs.\n ${backFunctb}\n ${backFuncvt}\n ${backFuncvb}`);
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