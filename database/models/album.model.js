const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumsSchema = schema({
    title: {type: String},
    label: {type: String},
    tracklist: {type: Array},
    releaseDate: {type: Date},
    cover: {type: String},
});

const Albums = mongoose.model('albums', albumsSchema);

module.exports = Albums;