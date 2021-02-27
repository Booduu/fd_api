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
        console.log('iiii', body)
        const filename = req.file.filename;
        const newAlbum = await albumCreate(body, filename);
        res.json(newAlbum);
    } catch(e) {
        console.log('error', e);
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
        if(req.file) {
            const findAlbum = await albumItem(req.body._id);
            fs.unlinkSync(`./assets/uploads/albums/${findAlbum.cover}`, (err) => {
                console.log(err)
            });
            body.cover = req.file.filename;
        }
        console.log('ggg', body)
        const albumModified = await albumEdit(body);
        res.json(body);
    } catch(e) {
        console.log('error', e);
    }
}

exports.deleteAlbum = async (req, res, next) => {
    try {
        const albumId = mongoose.Types.ObjectId(req.params.albumitem);
        const albumDeleted = await albumDelete(albumId);
        fs.unlinkSync(`./assets/uploads/albums/${req.body.cover}`, err => {
            console.log(err)
        });
        res.json(albumDeleted);
    } catch(e) {
        console.log('error', e);
    }
}