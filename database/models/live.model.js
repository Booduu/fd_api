const mongoose = require('mongoose');
const schema = mongoose.Schema;

const livesSchema = schema({
    date: {type: Date},
    city: {
        type: String,
        required: [true, 'Le champs city est requis.'],
    },
    place: {
        type: String,
        required: [true, 'Le champs place est requis.'],
    },
    name: {
        type: String,
        required: [true, 'Le champs name est requis.'],
    }, 
    ticketLink: {
        type: String,
        required: [true, 'Le champs ticketLink est requis.'],
    }, 

});

const Lives = mongoose.model('lives', livesSchema);

module.exports = Lives;

