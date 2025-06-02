const Coffee = require('../../schemas/coffee');
const { AttachmentBuilder } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const moment = require('moment');

module.exports = async (message) => {
    if (message.channel.id === "1378804890792628326") {
        if (message.content === "!coffee") {
            const count = await Coffee.countDocuments();
            message.reply(`Benji hat gesamt ${count} Kaffee getrunken!`);

            // Get last 7 days
            const today = moment().startOf('day');
            const days = [];
            for (let i = 6; i >= 0; i--) {
                days.push(today.clone().subtract(i, 'days'));
            }

            // Aggregate coffee counts per day
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

            const results = await Coffee.aggregate(pipeline);

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
                        label: 'Kaffee pro Tag',
                        data: counts,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Kaffee in den letzten 7 Tagen' }
                    },
                    scales: {
                        y: { beginAtZero: true, precision: 0 }
                    }
                }
            };

            const image = await chartJSNodeCanvas.renderToBuffer(configuration);
            const attachment = new AttachmentBuilder(image, { name: 'coffee_chart.png' });
            await message.reply({ files: [attachment] });
        }else if( message.content === "!now") {
            Coffee.create({ ts: new Date() })
            .then(() => console.log("Coffee record created"))
            //const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
            const formatted = twoHoursLater.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            message.reply(`Datensatz eingetragen, Benji hat um ${formatted} Uhr einen Kaffee getrunken!`);
        }
    }
}
