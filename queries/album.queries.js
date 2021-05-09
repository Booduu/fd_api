const Albums = require('../database/models/album.model');
const mongoose = require('mongoose');


exports.albumCreate = async (body) => {
    try {
        const album = new Albums({
            title: body.title,
            label: body.label,
            // tracklist: body.tracklist,
            releaseDate: body.releaseDate,
            soundcloudLink: body.soundcloudLink,
            buyLink: body.buyLink,
            downloadLink: body.downloadLink,
            cover: body.cover,
        });
        return album.save();
    } catch(e) {
        next(e);
    }
}

exports.albumList = async () => {
    return Albums.find().exec();
}

exports.albumItem = async (albumid) => {
    return Albums.findById(albumid).exec();
}

exports.albumDelete = async (albumId) => {
    return Albums.deleteOne({_id: albumId});
}

exports.albumEdit = (body) => {
    const myId = mongoose.Types.ObjectId(body._id)
    return Albums.updateOne({_id: myId}, {
        $set: {
            ...body,
        }
    });
}