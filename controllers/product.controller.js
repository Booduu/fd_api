const mongoose = require('mongoose');
const fs = require('fs');

const { productCreate, productList, productItem, productEdit, productDelete, } = require('../queries/product.queries');


exports.createProduct = async (req, res, next) => {
    try {
         if (req.file) {
            const body = {
                ...req.body,
                cover: req.file.filename,
            };
            const newProduct = await productCreate(body);
            res.json(newProduct);
         } else { 
            res.status(400).json({
                errors: {
                    cover: {
                        name: 'ValidatorError',
                        message: 'Une image est requise !'
                    }
                }
            });
            // throw new Error()
         } 
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
        let coverName;
        const productToModify = await productEdit(body);
        console.log('productToMOOOOodify', productToModify)
        if (req.file) {
            console.log('req.filereq.filereq.file', req.file)
            // coverName = req.file.filename;
            fs.unlinkSync(`./assets/uploads/products/${productToModify.cover}`, err => {
                console.log('err', e);
            });
            productToModify.cover = req.file.filename;
        } else {
            coverName = body.cover;  
            productToModify.cover = coverName;
        }
       
        productToModify.type = body.type;
        productToModify.name = body.name;
        productToModify.link = body.link;
       
        const productUpdated = await productToModify.save();
        res.json(productUpdated);
    } catch (e) {
        res.status(400).json(e);
    }
}

// exports.editProduct = async (req, res, next) => {
//     let body = {
//         ...req.body,
//     }
//     try {
//         if (req.file) {
//             const findProduct = await productItem(body._id);
//             fs.unlinkSync(`./assets/uploads/products/${findProduct.cover}`, err => {
//                 console.log('err', e);
//             });
//             body.cover = req.file.filename;
            
//         }
//         const productUpdated = await productEdit(body)
//         res.json(body);
        
//     } catch (e) {
//         next(e)
//     }
// }




exports.deleteProduct = async (req, res, next) => {
    console.log('RRRRR', req.body)
    try {
        const productId = mongoose.Types.ObjectId(req.params.productitem);
        const productDeleted = await productDelete(productId);
    console.log('RRRRR', productDeleted)
       
        if (productDeleted.deletedCount > 0) {
            fs.unlinkSync(`./assets/uploads/products/${req.body.cover}`, err => {
                console.log('unlinkSync error', err);
            });
            res.json(productDeleted);
        } else {
            res.status(400).json({
                errors: {
                    weird: true,
                    message: 'Oups, une erreur est survenue...'
                }
            });   
        }
    } catch (e) {
        res.status(400).json(e);
    }
}