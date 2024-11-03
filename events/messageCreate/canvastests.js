const { createCanvas, loadImage } = require('canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports = async (message) => {
    if (message.content !== "c-grid") return;
    const canvasWidth = 770; 
    const canvasHeight = 770; 
    const cellSize = 90; 
    const offset = 50; // Rand für Beschriftung


    const canvas = createCanvas(canvasWidth + offset, canvasHeight + offset);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize);
        }
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
        for (let i = 0; i < 8; i++) {
            ctx.fillText(i+1 , offset / 2, offset + i * cellSize + cellSize / 2);
        }

        // Oben die Buchstaben A bis H
        for (let i = 0; i < 8; i++) {
            ctx.fillText(String.fromCharCode(65 + i), offset + i * cellSize + cellSize / 2, offset / 2);
        }

        // Speichere das Bild in einem Buffer und sende es als Anhang
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'grid.png' });
        await message.reply({ files: [attachment] });
}
