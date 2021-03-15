const Lives = require('../database/models/live.model');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

exports.liveCreate = async (body) => {
    console.log('queries live', body)
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
        console.log('e', e);
        next(e);
    }
}

exports.liveDelete = async (id) => {
    return Lives.deleteOne({_id: id})
}

exports.liveEdit = (body) => {
    const myId = mongoose.Types.ObjectId(body._id)
    return Lives.updateOne({_id: myId}, {
        $set: {
            ...body,
        }
    })
}

exports.listLive = async() => {
    return Lives.find();
}

exports.itemLive = async (liveid) => {
    return Lives.findById(liveid).exec();
}

exports.editLive = async (liveid, body) => {
    return Lives.updateOne({_id: liveid}, {
        $set: {
            ...body,
            _id: liveid,
        } 
    });
}
