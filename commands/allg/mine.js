const { CommandType } = require('wokcommands');
const Game = require('../../schemas/game');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');
const regression = require('regression');
const { console } = require('inspector');


module.exports = {
  description: "Wichtig",
  type: CommandType.SLASH,
  options: [
    {
      name: 'diagrammart',
      description: 'Gibt die Diagrammart an',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Time-Bombs',   
          value: 'time-bombs'  
        },
        {
          name: 'Value-Time',
          value: 'value-time'
        },
        {
          name: 'Value-Bombs',
          value: 'value-bombs'
        }
      ]
    }
  ],
callback: async ({interaction }) => {
  let chartConfig
  let regressionData
  await interaction.deferReply({ ephemeral: true })
    const games = await Game.find({});
    const times = games.map(game => game.time);
    const bombs = games.map(game => game.bombsLeft);
    var values =[];
    let func
    for (let i = 0; i < times.length; i++) {
        values.push((99-bombs[i])/times[i])
    }
    const stackedForRegressiontb = games.map( game => [game.bombsLeft, game.time]);
    const stackedForRegressionvt = games.map( (game, i) => [values[i], game.time]);
    const stackedForRegressionvb = games.map( (game, i) => [values[i], game.bombsLeft]);


    console.log(" ");
    switch (interaction.options.getString('diagrammart')) {
      case 'time-bombs':
        regressionData = regression.linear(stackedForRegressiontb, { precision: 15});
        regressionPoints = regressionData.points;
        func = regressionData.string;
        chartConfig = {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Times vs Bombs',
              data: times.map((time, index) => ({
                x: bombs[index],
                y: time
              })),
              
              backgroundColor: 'red'
            },
            {
              label: 'Regression',
              data: regressionPoints.map(point => ({
                x: point[0],
                y: point[1]
              })),
              backgroundColor: 'blue'
            }
          ]
            
          },
          options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Bombs Left'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (in seconds)' 
                    },
                    beginAtZero: true 
                }
            }
        }
        }
        break;
      case 'value-time':
        regressionData = regression.polynomial(stackedForRegressionvt, { order: 3 });
        regressionPoints = regressionData.points;
        func = regressionData.string;
        chartConfig = {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Times vs Bombs',
              data: times.map((time, index) => ({
                x: values[index],
                y: time
              })),
              
              backgroundColor: 'red'
            },
            {
              label: 'Regression',
              data: regressionPoints.map(point => ({
                x: point[0],
                y: point[1]
              })),
              backgroundColor: 'blue'
            }
          ]
            
          },
          options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Value (Bombs Left / Time in seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (in seconds)' 
                    },
                    beginAtZero: true 
                }
            }
        }
        }
        break;
      case 'value-bombs':
        regressionData = regression.polynomial(stackedForRegressionvb, { order: 5 });
        regressionPoints = regressionData.points;
        func = regressionData.string;
        chartConfig = {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Times vs Bombs',
              data: bombs.map((bomb, index) => ({
                x: values[index],
                y: bomb
              })),
              
              backgroundColor: 'red'
            },
            {
              label: 'Regression',
              data: regressionPoints.map(point => ({
                x: point[0],
                y: point[1]
              })),
              backgroundColor: 'blue'
            }
          ]
            
          },
          options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Value (Bombs Left / Time in seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Bombs left' 
                    },
                    beginAtZero: true 
                }
            }
        }
        }
        break;
      default:
        console.log(interaction.options.getString('diagrammart'));
        return interaction.editReply('Unbekannte Diagrammart');

    }

    const canvas = new ChartJSNodeCanvas({
      width: 1200,
      height: 600,
    });
    const image = await canvas.renderToBuffer(chartConfig);
    const attachment = new AttachmentBuilder(image);
    await interaction.editReply({
      content: 'Hier ist dein Diagramm:' + func,
      files: [attachment]
    });
  },
} 