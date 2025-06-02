const mongoose = require('mongoose');


const coffeeSchema = new mongoose.Schema({
    ts: {
      type: Date,
      default: Date.now, 
    }
  });
  
  // Erstelle ein Modell auf Basis des Schemas
  const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;