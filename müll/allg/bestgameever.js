const { CommandType } = require('wokcommands');
const { EmbedBuilder } = require('discord.js');
const { get } = require('http');

module.exports = {
    description: 'Best Game Ever',
    type: CommandType.SLASH,
    options: [
        {
            name: 'difficulty',
            description: 'Difficulty of the game',
            type: 3,
            choices: [
                {
                    name: 'Easy',
                    value: 'easy',
                },
                {
                    name: 'Medium',
                    value: 'medium',
                },
                {
                    name: 'Hard',
                    value: 'hard',
                }
            ],
        },
        {
            name: 'user',
            description: 'User to challenge',
            type: 6,
        },
    ],
    testOnly: true,

    callback: ({ interaction, args }) => {
        const difficulty = args[0];
        const user = args[1];


function getFieldPermission(fieldright) {

    var randomdirection = [1, 1, 1, 1];
    if (fieldright[1] === 0) {
        var randomdirection = [1, 1, 1, 0];

    }
    if (fieldright[1] === 9) {
        var randomdirection = [1, 0, 1, 1];

    }
        if (fieldright[0] === 0) {
            var randomdirection = [1, 1, 0, 1];

                if (fieldright[1] === 0) {
                    var randomdirection = [1, 1, 0, 0];

                }
                if (fieldright[1] === 9) {
                    var randomdirection = [1, 0, 0, 1];

                }
        } 
        if (fieldright[0] === 9) {
            var randomdirection = [0, 1, 1, 1];

            if (fieldright[1] === 0) {
                var randomdirection = [0, 1, 1, 0];

            }
            if (fieldright[1] === 9) {
                var randomdirection = [0, 0, 1, 1];

            }
        }
        return randomdirection;
}
function generateNextField(startfield) {
        var PermRightStartfield = getFieldPermission(startfield);
        var directionindex = Math.random();
        if (directionindex <=0.25) {
            var index = "right";
        } else if (directionindex <=0.5 && directionindex >0.25) {
            var index = "down";
        } else if (directionindex <=0.75 && directionindex >0.5) {
            var index = "left";
        } else if (directionindex <=1 && directionindex >0.75) {
            var index = "up";
        }
        switch (index) {
            case "right":
                if (PermRightStartfield[0] === 0) { //wenn es nicht nach rechts darf
                    var nextFiled = [startfield[0]-1, startfield[1]]; //dann naach links
                } else {
                    var nextFiled = [startfield[0]+1, startfield[1]]; //sonst nach rechts
                }
                break;
            case "down":
                if (PermRightStartfield[1] === 0) { //wenn es nicht nach oben darf
                    var nextFiled = [startfield[0], startfield[1]-1]; //dann nach unten
                } else {
                    var nextFiled = [startfield[0], startfield[1]+1]; //sonst nach oben
                }
                break;
            case "left":
                if (PermRightStartfield[2] === 0) { //wenn es nicht nach links darf
                    var nextFiled = [startfield[0]+1, startfield[1]]; //dann nach rechts
                } else {
                    var nextFiled = [startfield[0]-1, startfield[1]]; //sonst nach links
                }
                break;
            case "up":
                if (PermRightStartfield[3] === 0) { //wenn es nicht nach unten darf
                    var nextFiled = [startfield[0], startfield[1]+1]; //dann nach oben
                } else {
                    var nextFiled = [startfield[0], startfield[1]-1]; //sonst nach unten
                }
                break;
            } 
return nextFiled;
}
function generateField(array) {
    array.forEach(element => {
        if (element[0] === 0 && element[1] === 0) { var field1 = "🟩"; } else { var field1 = "⬜"; }
        if (element[0] === 0 && element[1] === 1) { var field2 = "🟩"; } else { var field2 = "⬜"; }
        if (element[0] === 0 && element[1] === 2) { var field3 = "🟩"; } else { var field3 = "⬜"; }
        if (element[0] === 0 && element[1] === 3) { var field4 = "🟩"; } else { var field4 = "⬜"; }
        if (element[0] === 0 && element[1] === 4) { var field5 = "🟩"; } else { var field5 = "⬜"; }
        if (element[0] === 0 && element[1] === 5) { var field6 = "🟩"; } else { var field6 = "⬜"; }
        if (element[0] === 0 && element[1] === 6) { var field7 = "🟩"; } else { var field7 = "⬜"; }
        if (element[0] === 0 && element[1] === 7) { var field8 = "🟩"; } else { var field8 = "⬜"; }
        if (element[0] === 0 && element[1] === 8) { var field9 = "🟩"; } else { var field9 = "⬜"; }
        if (element[0] === 0 && element[1] === 9) { var field10 = "🟩"; } else { var field10 = "⬜"; }
        if (element[0] === 1 && element[1] === 0) { var field11 = "🟩"; } else { var field11 = "⬜"; }
        if (element[0] === 1 && element[1] === 1) { var field12 = "🟩"; } else { var field12 = "⬜"; }
        if (element[0] === 1 && element[1] === 2) { var field13 = "🟩"; } else { var field13 = "⬜"; }
        if (element[0] === 1 && element[1] === 3) { var field14 = "🟩"; } else { var field14 = "⬜"; }
        if (element[0] === 1 && element[1] === 4) { var field15 = "🟩"; } else { var field15 = "⬜"; }
        if (element[0] === 1 && element[1] === 5) { var field16 = "🟩"; } else { var field16 = "⬜"; }
        if (element[0] === 1 && element[1] === 6) { var field17 = "🟩"; } else { var field17 = "⬜"; }

    });
}

function generateField(array) {
    const fieldMap = new Map();
  
    for (let index = 0; index < 100; index++) {
      const row = Math.floor(index / 10); // Berechnung der Zeile
      const column = index % 10; // Berechnung der Spalte
      const fieldKey = `${row},${column}`;
      const fieldValue = (array.some(element => element[0] === row && element[1] === column)) ? "🟩" : "⬜";
      fieldMap.set(fieldKey, fieldValue);
    }
  
    return fieldMap;
  }
  

        //generate field
         const startField = [parseInt((Math.random()*9).toFixed(0)), parseInt((Math.random()*9).toFixed(0))];
  

            for (let i = 0; i < 80; i++) {
                if(!nextFiled) {
                    var nextFiled = generateNextField(startField);
                    var fields = [startField, nextFiled];
                } else {
                    var nextFiled = generateNextField(nextFiled);
                    fields.push(nextFiled);
                }
            }

            const fieldFinal = generateField(fields);
            const embed = new EmbedBuilder()
            .setTitle('Best Game Ever')
            .setColor('#FF0000')
            .addFields(
                { 
                name: 'Best Game Ever', 
                value: `${fieldFinal.get('0,0')}${fieldFinal.get('0,1')}${fieldFinal.get('0,2')}${fieldFinal.get('0,3')}${fieldFinal.get('0,4')}${fieldFinal.get('0,5')}${fieldFinal.get('0,6')}${fieldFinal.get('0,7')}${fieldFinal.get('0,8')}${fieldFinal.get('0,9')}\n${fieldFinal.get('1,0')}${fieldFinal.get('1,1')}${fieldFinal.get('1,2')}${fieldFinal.get('1,3')}${fieldFinal.get('1,4')}${fieldFinal.get('1,5')}${fieldFinal.get('1,6')}${fieldFinal.get('1,7')}${fieldFinal.get('1,8')}${fieldFinal.get('1,9')}\n${fieldFinal.get('2,0')}${fieldFinal.get('2,1')}${fieldFinal.get('2,2')}${fieldFinal.get('2,3')}${fieldFinal.get('2,4')}${fieldFinal.get('2,5')}${fieldFinal.get('2,6')}${fieldFinal.get('2,7')}${fieldFinal.get('2,8')}${fieldFinal.get('2,9')}\n${fieldFinal.get('3,0')}${fieldFinal.get('3,1')}${fieldFinal.get('3,2')}${fieldFinal.get('3,3')}${fieldFinal.get('3,4')}${fieldFinal.get('3,5')}${fieldFinal.get('3,6')}${fieldFinal.get('3,7')}${fieldFinal.get('3,8')}${fieldFinal.get('3,9')}\n${fieldFinal.get('4,0')}${fieldFinal.get('4,1')}${fieldFinal.get('4,2')}${fieldFinal.get('4,3')}${fieldFinal.get('4,4')}${fieldFinal.get('4,5')}${fieldFinal.get('4,6')}${fieldFinal.get('4,7')}${fieldFinal.get('4,8')}${fieldFinal.get('4,9')}\n${fieldFinal.get('5,0')}${fieldFinal.get('5,1')}${fieldFinal.get('5,2')}${fieldFinal.get('5,3')}${fieldFinal.get('5,4')}${fieldFinal.get('5,5')}${fieldFinal.get('5,6')}${fieldFinal.get('5,7')}${fieldFinal.get('5,8')}${fieldFinal.get('5,9')}\n${fieldFinal.get('6,0')}${fieldFinal.get('6,1')}${fieldFinal.get('6,2')}${fieldFinal.get('6,3')}${fieldFinal.get('6,4')}${fieldFinal.get('6,5')}${fieldFinal.get('6,6')}${fieldFinal.get('6,7')}${fieldFinal.get('6,8')}${fieldFinal.get('6,9')}\n${fieldFinal.get('7,0')}${fieldFinal.get('7,1')}${fieldFinal.get('7,2')}${fieldFinal.get('7,3')}${fieldFinal.get('7,4')}${fieldFinal.get('7,5')}${fieldFinal.get('7,6')}${fieldFinal.get('7,7')}${fieldFinal.get('7,8')}${fieldFinal.get('7,9')}\n${fieldFinal.get('8,0')}${fieldFinal.get('8,1')}${fieldFinal.get('8,2')}${fieldFinal.get('8,3')}${fieldFinal.get('8,4')}${fieldFinal.get('8,5')}${fieldFinal.get('8,6')}${fieldFinal.get('8,7')}${fieldFinal.get('8,8')}${fieldFinal.get('8,9')}\n${fieldFinal.get('9,0')}${fieldFinal.get('9,1')}${fieldFinal.get('9,2')}${fieldFinal.get('9,3')}${fieldFinal.get('9,4')}${fieldFinal.get('9,5')}${fieldFinal.get('9,6')}${fieldFinal.get('9,7')}${fieldFinal.get('9,8')}${fieldFinal.get('9,9')}`
            })
            interaction.channel.send({ embeds: [embed] })

    }
}