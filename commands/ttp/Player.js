const { CommandType } = require("wokcommands")
const mongoose = require('mongoose');

const Players = mongoose.models['tplayerst'];

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
    ],

    callback: async ({ interaction, channel }) => {
    if (interaction.user.bot) return;
    if (interaction.guild.id !== '943955705545760788') return;

    },
            
}