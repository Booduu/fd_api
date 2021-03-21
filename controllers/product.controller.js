const mongoose = require('mongoose');
const fs = require('fs');

const { productCreate, productList, productItem, productEdit, productDelete, } = require('../queries/product.queries');


exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productCreate(req.body);
        res.json(newProduct);
    } catch(e) {
        res.status(400).json(e);

    }
}

exports.listProduct = async (req, res, next) => {
    try {
        const listOfProducts = await productList();
        res.json(listOfProducts);
    } catch (e) {
        next(e)
    }
}

exports.itemProduct = async (req, res, next) => {
    try {
        const idOfProduct = req.params.productitem;
        const product = await productItem(idOfProduct);
        res.json(product)
    } catch (e) {
        next(e)
    }
}

exports.editProduct = async (req, res, next) => {
    let body = {
        ...req.body,
    }
    try {
        const productToModify = await productEdit(body);
        productToModify.type = body.type;
        productToModify.name = body.name;
        productToModify.link = body.link;
        productToModify.cover = body.cover;

        const productUpdated = await productToModify.save();
        res.json(productUpdated);
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = mongoose.Types.ObjectId(req.params.productitem);
        const productDeleted = await productDelete(productId);
        res.json(productDeleted);
    } catch (e) {
        res.status(400).json(e);
    }
}