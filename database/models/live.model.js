const mongoose = require('mongoose');
const schema = mongoose.Schema;

const livesSchema = schema({
    date: {
        type: Date,
        required: [true, 'Tu veux enregistrer une date de concert sans date, t\'es un champion'],
    },
    city: {
        type: String,
        required: [true, 'T\'es un champion toi c\'est pas possible'],
    },
    place: {
        type: String,
        required: [true, 'Met s\'y un peu du tien, ca va l\'faire'],
    },
    name: {
        type: String,
        required: [true, 'Prend ton temps'],
    }, 
    ticketLink: {
        type: String,
        // required: [true, 'Le champs ticketLink est requis.'],
    }, 

});


const Lives = mongoose.model('lives', livesSchema);

module.exports = Lives;

