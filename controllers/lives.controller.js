const { liveCreate, liveDelete, liveEdit, listLive, itemLive, editLive } = require('../queries/lives.queries');
// const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

// CREATE LIVE
exports.createLive = async (req, res, next) => {
    try {
        const body = req.body;
        const live = await liveCreate(body);
        res.json(live);
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}

// DELETE LIVE
exports.deleteLive = async (req, res, next) => {
    try {
        const liveId = mongoose.Types.ObjectId(req.params.id);
        const liveToDelete = await liveDelete(liveId);

        if (liveToDelete.deletedCount > 0) {
            res.json(liveToDelete)
        } else {
            throw { name: 'Oups!', message: 'Le live n\'a pas été supprimé' }
        }
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}



// EDIT LIVE
exports.editLive = async (req, res, next) => {
    try {
        const liveToModified = await itemLive(req.body._id);
        liveToModified.date = req.body.date;
        liveToModified.city = req.body.city;
        liveToModified.place = req.body.place;
        liveToModified.name = req.body.name;
        liveToModified.ticketLink = req.body.ticketLink;

        const liveUpdated = await liveToModified.save();
        if (!liveUpdated) {
           
        }
        res.json(liveUpdated);
     
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}

// GET LIST LIVES
exports.liveList = async (req, res, next) => {
    try {
        const listLives = await listLive();
        res.json(listLives);
    } catch(e) {
        // res.status(400).json(e);
        next(e);
    }
}

// GET LIVE
exports.liveItem = async (req, res, next) => {
    try {
        const id = req.params.liveid;
        const liveItem = await itemLive(id);
        res.json(liveItem);
    } catch(e) {        
        // res.status(400).json(e);
        next(e);
    }
}