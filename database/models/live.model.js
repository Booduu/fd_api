const mongoose = require('mongoose');
const schema = mongoose.Schema;

const livesSchema = schema({
    date: {type: Date},
    city: {type: String},
    place: {type: String},
    name: {
        type: String,
        required: [true, 'champs name requis'],
    }, 
    ticketLink: {type: String}, 

});

const Lives = mongoose.model('lives', livesSchema);

module.exports = Lives;

