const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    time: {
      type: Number,  
      required: true 
    },
    bombsLeft: {
      type: Number,
      required: true
    }
  });
  
  // Erstelle ein Modell auf Basis des Schemas
  const Game = mongoose.model('Game', gameSchema);

    module.exports = Game;