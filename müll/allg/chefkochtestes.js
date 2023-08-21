module.exports = async (message) => {
    const chefkoch = require('chefkoch-api');
    if (message.content === 'connect-chefkoch') {
        chefkoch.chefkochAPI.searchRecipes('pizza', 2, 0).then(function(data){

            console.log(data[0]);
            message.reply(data[0].name);
        });

    }
}