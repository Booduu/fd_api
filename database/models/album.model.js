const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumsSchema = schema({
    title: {
        type: String,
        required: [true, 'Tu le fais exprès c\'est pas possile'],
    },
    label: {
        type: String,
        required: [true, 'Champs obligatoire j\'ai dit !'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'Le champs "releaseDate" est requis.'],
    },
    soundcloudLink: {
        type: String,
        // required: [true, 'Le champs "soundcloudLink" est requis.'],
    },
    buyLink: {
        type: String,
        // required: [true, 'Le champs "buyLink" est requis.'],
    },
    downloadLink: {
        type: String,
        // required: [true, 'Le champs "downloadLink" est requis.'],
    },
    linkForLastAlbum: {
        type: String,
        // required: [true, 'Le champs "downloadLink" est requis.'],
    },
    cover: {
        type: String,
        required: [true, 'Une image est requise.']
    },
});

const Albums = mongoose.model('albums', albumsSchema);

module.exports = Albums;