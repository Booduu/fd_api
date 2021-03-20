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
        console.log('PPPPP', product)
        return product.save();
    } catch(e) {
        console.log('IIIIII', e)
        // next(e);
        res.status(400).json(e);
    }
  
}

exports.productList = async () => {
    return Product.find().exec();
} 

exports.productItem = async (id) => {
    console.log('Product,', id)
    return Product.findById(id).exec();
}

// exports.productEdit = async (body) => {
//     const myId = mongoose.Types.ObjectId(body._id);
//     return Product.updateOne({_id: myId}, {
//         $set: {
//             ...body,
//         }
//     });
// }

exports.productEdit = (body) => {
   return Product.findById(body._id).exec();

}

exports.productDelete = async (id) => {
    return Product.deleteOne({_id: id});
}