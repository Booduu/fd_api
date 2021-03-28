const Product = require('../database/models/product.model');
const mongoose = require('mongoose');

exports.productCreate = async (body, filename) => {
    try {
        const product = new Product({
            type: body.type,
            name: body.name,
            link: body.link,
            cover: body.cover,
        });
        return product.save();
    } catch(e) {
        res.status(400).json(e);
    }
  
}

exports.productList = async () => {
    return Product.find().exec();
} 

exports.productItem = async (id) => {
    return Product.findById(id).exec();
}

exports.productEdit = (body) => {
   return Product.findById(body._id).exec();

}

exports.productDelete = async (id) => {
    return Product.deleteOne({_id: id});
}