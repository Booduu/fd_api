const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumsSchema = schema({
    title: {
        type: String,
        required: [true, 'Le champs "title" est requis.'],
    },
    label: {
        type: String,
        required: [true, 'Le champs "label" est requis.'],
    },
    tracklist: {
        type: Array,
    },
    releaseDate: {
        type: Date,
        required: [true, 'Le champs "releaseDate" est requis.'],
    },
    soundcloudLink: {
        type: String,
        required: [true, 'Le champs "soundcloudLink" est requis.'],
    },
    buyLink: {
        type: String,
        required: [true, 'Le champs "buyLink" est requis.'],
    },
    downloadLink: {
        type: String,
        required: [true, 'Le champs "downloadLink" est requis.'],
    },
    cover: {
        type: String,
        required: [true, 'Une image est requise.']
    },
});

const Albums = mongoose.model('albums', albumsSchema);

module.exports = Albums;