const { albumCreate, albumList, albumItem, albumEdit, albumDelete } = require('../queries/album.queries');
const mongoose = require('mongoose');
const fs = require('fs');

// CREATION ALBUM
exports.createAlbum = async (req, res, next) => {
    // const tracklist = req.body.tracklist.split(',');
    try {
        const body = {
            ...req.body,
            // tracklist,
        };

        const newAlbum = await albumCreate(body);
        res.json(newAlbum);
            
    } catch(e) {
        // res.status(400).json(e);
       
        next(e);
    }
}

// GET LIST ALBUM
exports.listAlbum = async (req, res, next) => {
    try {
        const listAlbum = await albumList();
        res.json(listAlbum);
    } catch(e) {
        next(e);
    }
}

// GET ALBUM
exports.itemAlbum = async (req, res, next) => {
    try {
        const id = req.params.albumitem;
        const album = await albumItem(id);
        res.json(album);
    } catch(e) {
        next(e);
    }
}

// EDIT ALBUM
exports.editAlbum = async (req, res, next) => {
    // const tracklist = req.body.tracklist.split(',');
    let body = {
        ...req.body,
        // tracklist,
    };
    try {
        const albumToModify = await albumItem(req.body._id);
        albumToModify.title = body.title;
        albumToModify.label = body.label;
        // albumToModify.tracklist = body.tracklist;
        albumToModify.releaseDate = body.releaseDate;
        albumToModify.soundcloudLink = body.soundcloudLink;
        albumToModify.buyLink = body.buyLink;
        albumToModify.downloadLink = body.downloadLink;
        albumToModify.cover = body.cover;

        const albumModified = await albumToModify.save();
        res.json(albumModified);
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}

// DELETE ALBUM
exports.deleteAlbum = async (req, res, next) => {
    try {
        const albumId = mongoose.Types.ObjectId(req.params.albumitem);
        const albumDeleted = await albumDelete(albumId);
        if (albumDeleted.deletedCount > 0) {
            res.json(albumDeleted);
        } else {
            throw { name: 'Oups!', message: 'L\'album n\'a pas été supprimé' }
        }
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}