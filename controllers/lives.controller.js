const { liveCreate, liveDelete, liveEdit, listLive, itemLive, editLive } = require('../queries/lives.queries');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

exports.createLive = async (req, res, next) => {
    console.log('aaaaaa', req.body)
    try {
        const body = req.body;
        const live = await liveCreate(body);
        res.json(live);
    } catch(e) {
        next(e);
    }
}

exports.deleteLive = async (req, res, next) => {
    try {
        const liveId = mongoose.Types.ObjectId(req.params.id);
        const liveToDelete = await liveDelete(liveId);
        res.json(liveToDelete)
    } catch {
        console.log('error', e);
    }
}

exports.editLive = async (req, res, next) => {
    try {
        const liveUpdated = await liveEdit(req.body);
        console.log('ddddddd', liveUpdated)
        res.json(liveUpdated);
    } catch(e) {
        console.log('error', e);
    }
}

exports.liveList = async (req, res, next) => {
    try {
        const listLives = await listLive();
        res.json(listLives);
    } catch(e) {
        console.log('error', e);
    }
}

exports.liveItem = async (req, res, next) => {
    try {
        const id = req.params.liveid;
        const liveItem = await itemLive(id);
        res.json(liveItem);
    } catch(e) {
        console.log('error', e);
    }
}

exports.liveEdit = async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.liveid;
        const liveModified = await editLive(id, body);
        res.json(liveModified);
    } catch(e) {
        console.log('error', e);
    }
}
