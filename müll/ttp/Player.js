const { CommandType } = require("wokcommands")
const mongoose = require('mongoose');

const ttpPlayer = new mongoose.Schema({
    name: {type:String, required: true},
    charakter: {type:String, required: true},
    health: { type: Number, default: 100},
    mana: { type: Number, default: 100},

});
const Players = mongoose.model('TTPPlayers', ttpPlayer);

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
    const charakter = interaction.options.getString('erstellen');
    const existchar = await Players.find({charakter: charakter});
    if (existchar) {
        channel.send('Dieser Charakter existiert schon');
        return;
    }

    (async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
    })
    const player = await Players.findOne({name: interaction.user.username});
    if (player) {
        channel.send('Du hast schon einen Charakter');
        return;
    }
    else {
        switch (charakter) {
            case 'koch':
                const cKoch = new Players({
                    name: interaction.user.username,
                    charakter: 'Koch',
                });
                await cKoch.save();
                break;
                case 'psychologe':
                const cPsychologe = new Players({
                    name: interaction.user.username,
                    charakter: 'Psychologe',
                });
                await cPsychologe.save();
                break;
                case 'soldat':
                const cSoldat = new Players({
                    name: interaction.user.username,
                    charakter: 'Soldat',
                });
                await cSoldat.save();
                break;
                case 'jugendlicher':
                const cJugendlicher = new Players({
                    name: interaction.user.username,
                    charakter: 'Jugendlicher',
                });
                await cJugendlicher.save();
                break;
                case 'polizist':
                const cPolizist = new Players({
                    name: interaction.user.username,
                    charakter: 'Polizist',
                });
                await cPolizist.save();
                break;
                case 'elektroniker':
                const cElektroniker = new Players({
                    name: interaction.user.username,
                    charakter: 'Elektroniker',
                });
                await cElektroniker.save();
                break;
                case 'anwalt':
                const cAnwalt = new Players({
                    name: interaction.user.username,
                    charakter: 'Anwalt',
                });
                await cAnwalt.save();
                break;
                case 'schmied':
                const cSchmied = new Players({
                    name: interaction.user.username,
                    charakter: 'Schmied',
                });
                await cSchmied.save();
                break;
                case 'architekt':
                const cArchitekt = new Players({
                    name: interaction.user.username,
                    charakter: 'Architekt',
                });
                await cArchitekt.save();
                break;
                case 'kletterer':
                const cKletterer = new Players({
                    name: interaction.user.username,
                    charakter: 'Kletterer',
                });
                await cKletterer.save();
                break;
                case 'künstler':
                const cKünstler = new Players({
                    name: interaction.user.username,
                    charakter: 'Künstler',
                });
                await cKünstler.save();
                break;
                case 'rentner':
                const cRentner = new Players({
                    name: interaction.user.username,
                    charakter: 'Rentner',
                });
                await cRentner.save();
                break;  
            }

    }
    },
            
}