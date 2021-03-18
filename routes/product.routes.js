const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join('./assets/uploads/products'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        },
    }),
});

const { createProduct, listProduct, itemProduct, editProduct, deleteProduct } = require('../controllers/product.controller');

router.post('/productcreate', upload.single('cover'), createProduct);
router.get('/productlist', listProduct);
router.get('/:productitem', itemProduct);
router.patch('/:productitem', upload.single('cover'), editProduct);
router.delete('/:productitem', deleteProduct);

module.exports = router;

   