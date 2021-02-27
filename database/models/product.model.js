const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
    type: {type: String},
    name: {type: String},
    link: {type: String},
    cover: {type: String},
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;