const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumsSchema = schema({
    title: {type: String},
    label: {type: String},
    tracklist: {type: Array},
    releaseDate: {type: Date},
    soundcloudLink: {type: String},
    buyLink: {type: String},
    downloadLink: {type: String},
    cover: {type: String},
});

const Albums = mongoose.model('albums', albumsSchema);

module.exports = Albums;