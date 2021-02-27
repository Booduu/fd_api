const mongoose = require('mongoose');
const schema = mongoose.Schema;

const livesSchema = schema({
    date: {type: Date},
    city: {type: String},
    place: {type: String},
    name: {type: String}, 
    ticketLink: {type: String}, 

});

const Lives = mongoose.model('lives', livesSchema);

module.exports = Lives;

