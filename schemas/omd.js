const mongoose = require('mongoose');


const omdSchema = new mongoose.Schema({
    ts: {
      type: Date,
      default: Date.now, 
    }
  });
  
  // Erstelle ein Modell auf Basis des Schemas
  const Omd = mongoose.model('Omd', omdSchema);

module.exports = Omd;