const Lives = require('../database/models/live.model');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

exports.liveCreate = async (body) => {
    try {
        const live = new Lives({
           date: body.date,
           city: body.city,
           place: body.place,
           name: body.name,
           ticketLink: body.ticketLink,
        });
        return live.save();
    } catch(e) {
        next(e);
    }
}

exports.liveDelete = async (id) => {
    return Lives.deleteOne({_id: id});
}

exports.listLive = async() => {
    return Lives.find();
}

exports.itemLive = async (liveid) => {
    return Lives.findById(liveid).exec();
}

