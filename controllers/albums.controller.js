const { albumCreate, albumList, albumItem, albumEdit, albumDelete } = require('../queries/album.queries');
const mongoose = require('mongoose');
const fs = require('fs');

exports.createAlbum = async (req, res, next) => {
    const tracklist = req.body.tracklist.split(',');
    try {
        const body = {
            ...req.body,
            tracklist,
        };

        const newAlbum = await albumCreate(body);
        res.json(newAlbum);
            
    } catch(e) {
        res.status(400).json(e);
    }
}

exports.listAlbum = async (req, res, next) => {
    try {
        const listAlbum = await albumList();
        res.json(listAlbum);
    } catch(e) {
        console.log('error', e);
    }
}

exports.itemAlbum = async (req, res, next) => {
    try {
        const id = req.params.albumitem;
        const album = await albumItem(id);
        res.json(album);
    } catch(e) {
        console.log('error', e);
    }
}

exports.editAlbum = async (req, res, next) => {
    const tracklist = req.body.tracklist.split(',');
    let body = {
        ...req.body,
        tracklist,
    };
    try {
        const albumToModify = await albumItem(req.body._id);
        albumToModify.title = body.title;
        albumToModify.label = body.label;
        albumToModify.tracklist = body.tracklist;
        albumToModify.releaseDate = body.releaseDate;
        albumToModify.soundcloudLink = body.soundcloudLink;
        albumToModify.buyLink = body.buyLink;
        albumToModify.downloadLink = body.downloadLink;
        albumToModify.cover = body.cover;

        const albumModified = await albumToModify.save();
        res.json(albumModified);
    } catch(e) {
        res.status(400).json(e);
    }
}

exports.deleteAlbum = async (req, res, next) => {
    try {
        const albumId = mongoose.Types.ObjectId(req.params.albumitem);
        const albumDeleted = await albumDelete(albumId);
        res.json(albumDeleted);
    } catch(e) {
        res.status(400).json(e);
    }
}