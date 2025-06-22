const mongoose = require('mongoose');

const bookShe = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startChapter: {
        type: Number,
        required: true,
    },
    endChapter: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        //default: Date.now, // Standardmäßig das aktuelle Datum
    },
    finishDate: {
        type: Date,
        required: true,
    },
    deleteDate: {
        type: Date,
        required: true,
    },
  });
  
const Book = mongoose.model('Book', bookShe);

module.exports = Book;