const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports =  async (message, instance) => {
    if (message.content === '!chart') {
    const canvas = new ChartJSNodeCanvas({
        width: 800, 
        height: 600,
        backgroundColour: '#ffffff',
        }
        );
        const configuration = {
            type: 'radar',
            data: {	
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    data: [65, 59, 80, 81, 56, 55, 200],
                    backgroundColor: [  
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
            }]
            },
            
        };
        const image =  await canvas.renderToBuffer(configuration);
        const attachment = new AttachmentBuilder(image)
        message.channel.send({
            //content: 'Chart',
            files: [attachment],
        });

}
}