const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
    type: {
        type: String,
        required: [true, 'Le champs "type" est requis'],
    },
    name: {
        type: String,
        required: [true, '"Champs requis" ca veut dire "Champs requis"'],
    },
    link: {
        type: String,
        required: [true, 'On a dit "requis le champs"'],
    },
    cover: {
        type: String,
        required: [true, 'Une image est requise.'],
    },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;