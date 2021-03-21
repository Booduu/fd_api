const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { extractUserFromToken } = require('../config/verifyToken');

const { createLive, deleteLive, editLive } = require('../controllers/lives.controller');
const { createProduct, editProduct, deleteProduct } = require('../controllers/product.controller');
const { createAlbum, editAlbum, deleteAlbum } = require('../controllers/albums.controller');

router.get('/', extractUserFromToken, (req, res) => {
    console.log('ddddd', req.user)
    res.json(req.user)
})

// LIVES ROUTES PROTECTED
router.post('/live/livecreate', extractUserFromToken, createLive)
router.patch('/live/:liveid', extractUserFromToken, editLive);
router.delete('/live/livedelete/:id', extractUserFromToken, deleteLive);

// PRODUCTS ROUTES PROTECTED
router.delete('/product/:productitem', extractUserFromToken, deleteProduct);
router.post('/product/productcreate', extractUserFromToken, createProduct);
router.patch('/product/:productitem', extractUserFromToken, editProduct);

// ALBUMS ROUTES PROTECTED
router.delete('/album/:albumitem', extractUserFromToken, deleteAlbum);
router.post('/album/albumcreate', extractUserFromToken, createAlbum);
router.patch('/album/:albumitem', extractUserFromToken, editAlbum);

 
module.exports = router;