const { CommandType } = require('wokcommands');

module.exports = {

  description: "Random zahl yeeten",
  type: CommandType.SLASH,
  options: [
    {
      name: "min",
      description: "time to wait before reminding you",
      type: 10,
      required: true,
    },
    {
      name: "max",
      description: "what you want to be reminded of",
      type: 10,
      required: true,
    },
    ],
  
    callback: ({ interaction, args }) => {
      const min = interaction.options.getNumber('min');
      const max = interaction.options.getNumber('max');

      if (min < 0 || max < 0) {
        return 'NEIN'
      }
      if (min > max ) {
        return 'Nö'
      }
        
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
      return `Your random number between ${min} and ${max} is: ${randomNumber}`;
    },
};