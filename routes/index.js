const express = require('express');
const router = express.Router();

const liveRoutes = require('./live.routes');
const albumRoutes = require('./album.routes');
// const filesRoutes = require('./files.routes');
const productRoutes = require('./product.routes');


const protectedRoutes = require('./protected.routes');
const userRoutes = require('./user.routes');
// const videoRoutes = require('./video.routes');

router.use('/live', liveRoutes);

router.use('/album', albumRoutes);
// router.use('/file', filesRoutes);
router.use('/product', productRoutes);


router.use('/user', userRoutes);
router.use('/protected', protectedRoutes);

// router.use('/video', videoRoutes);

module.exports = router;
