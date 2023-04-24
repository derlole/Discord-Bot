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
            type: 'bar',
            data: {	
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
            }]
            }
        };
        const image =  await canvas.renderToBuffer(configuration);
        const attachment = new AttachmentBuilder(image)
        message.channel.send({
            //content: 'Chart',
            files: [attachment],
        });

}
}