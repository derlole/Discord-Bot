const { CommandType } = require("wokcommands")
const mongoose = require('mongoose');
const { EmbedBuilder} = require('discord.js');


const newPlayer = new mongoose.Schema({
    username:{type:String, default: 'none'},
    name:{type:String, default: 'none'},
    charakter:{type:String, default: 'none'},
    health:{ type: Number, default: 100},
    fightpoints:{ type: Number, default: 100},
    inventar:{type: Array, default: []},
    other:{type: Array, default: []},
});


//const Players = mongoose.models['tplayerst'];

module.exports = {
    description: "hat keiner gesehen!",
    type: CommandType.SLASH,
    options: [
        {
            name: "erstellen",
            description: "ersetellet ein Charakter",
            type: 3,
            required: false,
                choices: [
                {
                    name: "Koch",
                    value: "koch"
                },
                {
                    name: "Psychologe",
                    value: "psychologe"
                },
                {
                    name: "Soldat",
                    value: "soldat"
                },
                {
                    name: "Jugendlicher",
                    value: "jugendlicher"
                },
                {
                    name: "Polizist",
                    value: "polizist"
                },
                {
                    name: "Elektroniker",
                    value: "elektroniker"
                },
                {
                    name: "Anwalt",
                    value: "anwalt"
                },
                {
                    name: "Schmied",
                    value: "schmied"
                },
                {
                    name: "Architekt",
                    value: "architekt"
                },
                {
                    name: "Kletterer",
                    value: "kletterer"
                },
                {
                    name: "Künstler",
                    value: "künstler"
                },
                {
                    name: "Rentner",
                    value: "rentner"
                }
            ],
        },
        {
            name: "loeschen",
            description: "loescht ein Charakter",
            type: 3,
            required: false,
        },
        {
            name: "anzeigen",
            description: "zeigt alle Charaktere an",
            type: 5,
            required: false,
        },
        {
            name: "gamename",
            description: "lege einen Namen fur deinen Charakter fest",
            type: 3,
            required: false,
        },
        
    ],
    testOnly: true,
    

    callback: async ({ interaction, channel }) => {
    if (interaction.user.bot) return;
    if (interaction.guild.id !== '943955705545760788') return;
        const option = interaction.options.getString('erstellen');
        const option2 = interaction.options.getString('loeschen');
    if (option && option2) {
        interaction.reply({ content: `dulli...`, ephemeral: true });
        return;
    }

    try {
        var Players = mongoose.models['tplayerst'];

        var playerModele = await Players.findOne({accesID: "0001"});
    }
    catch (err) {
        interaction.reply({ content: `${err}`, ephemeral: true });
        return;
    }
    if (option) {



            if(playerModele.player1.name === 'none') {
                var player = playerModele.player1;
            }
            else if(playerModele.player2.name === 'none') {
                var player = playerModele.player2;
            }
            else if(playerModele.player3.name === 'none') {
                var player = playerModele.player3;
            }
            else if(playerModele.player4.name === 'none') {
                var player = playerModele.player4;
            }
            else if(playerModele.player5.name === 'none') {
                var player = playerModele.player5;
            }
            else if(playerModele.player6.name === 'none') {
                var player = playerModele.player6;
            }
            else if(playerModele.player7.name === 'none') {
                var player = playerModele.player7;
            }
            else if(playerModele.player8.name === 'none') {
                var player = playerModele.player8;
            }
            else if(playerModele.player9.name === 'none') {
                var player = playerModele.player9;
            }
            else if(playerModele.player10.name === 'none') {
                var player = playerModele.player10;
            }
            else if(playerModele.player11.name === 'none') {
                var player = playerModele.player11;
            }
            else if(playerModele.player12.name === 'none') {
                var player = playerModele.player12;
            }
            user = [ playerModele.player1.name, playerModele.player2.name, playerModele.player3.name, playerModele.player4.name, playerModele.player5.name, playerModele.player6.name, playerModele.player7.name, playerModele.player8.name, playerModele.player9.name, playerModele.player10.name, playerModele.player11.name, playerModele.player12.name
            ]
            chars = [ playerModele.player1.charakter, playerModele.player2.charakter, playerModele.player3.charakter, playerModele.player4.charakter, playerModele.player5.charakter, playerModele.player6.charakter, playerModele.player7.charakter, playerModele.player8.charakter, playerModele.player9.charakter, playerModele.player10.charakter, playerModele.player11.charakter, playerModele.player12.charakter
            ]
        if(user.includes(interaction.user.username)) {
            interaction.reply({ content: `Du hast bereits einen Charakter`, ephemeral: true });
            return;
        }
        if(chars.includes(option)) {
            interaction.reply({ content: `Dieser Charakter ist bereits vergeben`, ephemeral: true });
            return;
        }
        uniqueGameName = interaction.options.getString('gamename');
        if(uniqueGameName) {
            var uniquName = uniqueGameName;
        }
        else {
            var uniquName = 'default';
        }

            if (player) {
                player.name = interaction.user.username;    
                player.charakter = option;
                playerModele.save();
                interaction.reply({ content: `Charakter ${option} erstellt`, ephemeral: true });

                    const visuA = new EmbedBuilder()
                    .setTitle('Neuer Spieler')
                    .addFields(
                        {name: `New Player`, value: `${player.name}: ${player.charakter}`}
                    )
                    interaction.channel.send({ embeds: [visuA] })


                const newPlayerModel = mongoose.model('Playersunique', newPlayer);
                    try {
                        console.log('brakepoint2');
                        const newPlayerx = new newPlayerModel({
                            username: interaction.user.username,
                            name: uniquName,
                            charakter: option,
                            usreID: interaction.user.id,
                        });
                        await newPlayerx.save();
                    } catch (error) {
                        console.log(error);
                    }

            }
            else {
                interaction.reply({ content: `Es gibt keine freien Charaktere mehr`, ephemeral: true });
            }

         }

         const view = interaction.options.getBoolean('anzeigen');
         if(view) {
            const viewE = new EmbedBuilder()
            .setTitle('Charaktere')
            .addFields(
                {name: `Player 1`, value: `${playerModele.player1.name}: ${playerModele.player1.charakter}`},
                {name: `Player 2`, value: `${playerModele.player2.name}: ${playerModele.player2.charakter}`},
                {name: `Player 3`, value: `${playerModele.player3.name}: ${playerModele.player3.charakter}`},
                {name: `Player 4`, value: `${playerModele.player4.name}: ${playerModele.player4.charakter}`},
                {name: `Player 5`, value: `${playerModele.player5.name}: ${playerModele.player5.charakter}`},
                {name: `Player 6`, value: `${playerModele.player6.name}: ${playerModele.player6.charakter}`},
                {name: `Player 7`, value: `${playerModele.player7.name}: ${playerModele.player7.charakter}`},
                {name: `Player 8`, value: `${playerModele.player8.name}: ${playerModele.player8.charakter}`},
                {name: `Player 9`, value: `${playerModele.player9.name}: ${playerModele.player9.charakter}`},
                {name: `Player 10`, value: `${playerModele.player10.name}: ${playerModele.player10.charakter}`},
                {name: `Player 11`, value: `${playerModele.player11.name}: ${playerModele.player11.charakter}`},
                {name: `Player 12`, value: `${playerModele.player12.name}: ${playerModele.player12.charakter}`},
            )

            interaction.channel.send({ embeds: [viewE] })
        }
    }
    }