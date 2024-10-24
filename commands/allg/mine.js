const { CommandType } = require('wokcommands');
const Game = require('../../schemas/game');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');

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
  await interaction.deferReply({ ephemeral: true })
    const games = await Game.find({});
    const times = games.map(game => game.time);
    const bombs = games.map(game => game.bombsLeft);
    var values =[];
    for (let i = 0; i < times.length; i++) {
        values.push((99-bombs[i])/times[i])
    }
    switch (interaction.options.getString('diagrammart')) {
      case 'time-bombs':
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
      content: 'Hier ist dein Diagramm:',
      files: [attachment]
    });
  },
} 