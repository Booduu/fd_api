const express = require('express');
const router = express.Router();

const { listProduct, itemProduct } = require('../controllers/product.controller');

router.get('/productlist', listProduct);
router.get('/:productitem', itemProduct);

module.exports = router;

   