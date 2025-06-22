const mongoose = require('mongoose');
const { userInfo } = require('os');

const valShe = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    agent: {
        type: Number,
        required: true,
    },
    map: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    ability: {
        type: Number,
        required: true,
    },
    weapon: {
        type: Number,
        required: true,
    },
    quote: {
        type: Number,
        required: true,
    }
  });
  
const Valdle = mongoose.model('Valdle', valShe);

module.exports = Valdle;