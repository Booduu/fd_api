const express = require('express');
const router = express.Router();

const liveRoutes = require('./live.routes');
const albumRoutes = require('./album.routes');
const productRoutes = require('./product.routes');
const userRoutes = require('./user.routes');
const protectedRoutes = require('./protected.routes');

router.use('/live', liveRoutes);
router.use('/album', albumRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/protected', protectedRoutes);

module.exports = router;
