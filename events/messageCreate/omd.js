const Omd = require('../../schemas/omd');
const { AttachmentBuilder } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const moment = require('moment');
let valoMode = false;
let roundCounter = 0;
module.exports = async (message) => {
    if (message.channel.id === "1378804890792628326") {
        if (message.content === "!omdStats") {
            const count = await Omd.countDocuments();
            message.reply(`Benji hat insgesamt ${count}mal "Oh my days" gesagt!`);

            // Get last 7 days
            const today = moment().startOf('day');
            const days = [];
            for (let i = 6; i >= 0; i--) {
                days.push(today.clone().subtract(i, 'days'));
            }

           
            const pipeline = [
                {
                    $match: {
                        ts: {
                            $gte: days[0].toDate(),
                            $lte: days[6].endOf('day').toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$ts" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];

            const results = await Omd.aggregate(pipeline);

            // Map results to days
            const counts = days.map(day => {
                const dateStr = day.format('YYYY-MM-DD');
                const found = results.find(r => r._id === dateStr);
                return found ? found.count : 0;
            });

            // Chart config
            const width = 600;
            const height = 300;
            const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
            const configuration = {
                type: 'bar',
                data: {
                    labels: days.map(d => d.format('ddd, DD.MM')),
                    datasets: [{
                        label: 'Oh my days pro Tag',
                        data: counts,
                        backgroundColor: 'rgba(234, 0, 255, 0.7)'
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Oh my days in den letzten 7 Tagen' }
                    },
                    scales: {
                        y: { beginAtZero: true, precision: 0 }
                    }
                }
            };

            const image = await chartJSNodeCanvas.renderToBuffer(configuration);
            const attachment = new AttachmentBuilder(image, { name: 'omd_chart.png' });
            await message.reply({ files: [attachment] });
        
        }else if( message.content === "!omd") {
            Omd.create({ ts: new Date() })
            .then(() => console.log("Omd record created"))
            const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
            const formatted = twoHoursLater.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const dateformatted = twoHoursLater.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            message.reply(`${dateformatted}, ${formatted}: <@702427586822930493> "Oh my days!"`);
            if (valoMode) {
                roundCounter++;
            }
        }else if( message.content === "!toggleValo") {
            valoMode = !valoMode;
            if (valoMode) {
                message.reply("Valo Mode ist jetzt **aktiviert**!");
            }else {
                message.reply(`Neue Runde gestartet! In der Runde davor hat Benji ${roundCounter}mal "Oh my days" gesagt. :)`);
                message.reply("Valo Mode ist jetzt **deaktiviert**!");
            }
        }else if( message.content === "!newRound"){
            if (!valoMode) {
                valoMode = true;
                return message.reply("Valo Mode war nicht aktiviert! Valo Mode wurde automatisch aktiviert.");
            }
            message.reply(`Neue Runde gestartet! In der Runde davor hat Benji ${roundCounter}mal "Oh my days" gesagt. :)`);
            roundCounter = 0;
        }
    }
}
