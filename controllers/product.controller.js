const mongoose = require('mongoose');
const fs = require('fs');

const { productCreate, productList, productItem, productEdit, productDelete, } = require('../queries/product.queries');


exports.createProduct = async (req, res, next) => {
    console.log('body', req.body);
    console.log('file', req.file);
    try {
        const body = {
            ...req.body,
            filename: req.file.filename,
        };
        const newProduct = await productCreate(body);
        res.json(newProduct);
    } catch (e) {
        console.log('err', e);
    }
}

exports.listProduct = async (req, res, next) => {
    console.log('productlist')
    try {
        const listOfProducts = await productList();
        res.json(listOfProducts);
    } catch (e) {
        console.log('err', e)
    }
}

exports.itemProduct = async (req, res, next) => {
    try {
        const idOfProduct = req.params.productitem;
        const product = await productItem(idOfProduct);
        res.json(product)
    } catch (e) {
        console.log('err', e);
    }
}

exports.editProduct = async (req, res, next) => {
    console.log('bodyddddd', req.body);
    console.log('fileddddd', req.file);
    let body = {
        ...req.body,
    }
    try {
        if (req.file) {
            const findProduct = await productItem(body._id);
            fs.unlinkSync(`./assets/uploads/products/${findProduct.cover}`, err => {
                console.log('err', e);
            });
            body.cover = req.file.filename;
            
        }
        const productUpdated = await productEdit(body)
        res.json(body);
        
    } catch (e) {
        console.log('err', e);
    }
}

exports.deleteProduct = async (req, res, next) => {
    console.log('lldfdkf', req.params.productitem)
    console.log('lldfdkf', req.body.cover)

    try {
        const productId = mongoose.Types.ObjectId(req.params.productitem);
        const productDeleted = await productDelete(productId);
        fs.unlinkSync(`./assets/uploads/products/${req.body.cover}`, err => {
            console.log('err', err);
        });
        res.json(productDeleted);
    } catch (e) {
        console.log('err', e)
    }
}