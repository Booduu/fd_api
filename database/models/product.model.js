const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
    type: {
        type: String,
        required: [true, 'Le champs "type" est requis'],
    },
    name: {
        type: String,
        required: [true, 'Le champs "name" est requis'],
    },
    link: {
        type: String,
        required: [true, 'Le champs "link" est requis'],
    },
    cover: {
        type: String,
        required: [true, 'Le champs "cover" est requis'],
    },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;