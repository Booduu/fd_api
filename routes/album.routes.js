const express = require('express');
const router = express.Router();

const { listAlbum, itemAlbum } = require('../controllers/albums.controller');

router.get('/albumlist', listAlbum);
router.get('/:albumitem', itemAlbum);

module.exports = router;
