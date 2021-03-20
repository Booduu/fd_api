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
        res.status(400).json(e);

    }
}

exports.deleteLive = async (req, res, next) => {
    try {
        const liveId = mongoose.Types.ObjectId(req.params.id);
        const liveToDelete = await liveDelete(liveId);

        if (liveToDelete.deletedCount > 0) {
            res.json(liveToDelete)
        } else {
            res.status(400).json({
                errors: {
                    weird: true,
                    message: 'Oups, une erreur est survenue...'
                }
            });   
        }
    } catch(e) {
        res.status(400).json(e);

    }
}

exports.editLive = async (req, res, next) => {
    try {
        const liveToModified = await itemLive(req.body._id);
        liveToModified.date = req.body.date;
        liveToModified.city = req.body.city;
        liveToModified.place = req.body.place;
        liveToModified.name = req.body.name;
        liveToModified.ticketLink = req.body.ticketLink;

        const liveUpdated = await liveToModified.save();

        res.json(liveUpdated);
     
    } catch(e) {
        res.status(400).json(e);
    }
}

exports.liveList = async (req, res, next) => {
    try {
        const listLives = await listLive();
        res.json(listLives);
    } catch(e) {
        res.status(400).json(e);

    }
}

exports.liveItem = async (req, res, next) => {
    try {
        const id = req.params.liveid;
        const liveItem = await itemLive(id);
        res.json(liveItem);
    } catch(e) {        
        res.status(400).json(e);
    }
}

// exports.liveEdit = async (req, res, next) => {
//     try {
//         const body = req.body;
//         const id = req.params.liveid;
//         const liveModified = await editLive(id, body);
//         res.json(liveModified);
//     } catch(e) {
//         res.status(400).json(e);

//     }
// }
