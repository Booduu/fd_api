const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('aaaaaa', req.body)
            cb(null, path.join('./assets/uploads/albums'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
});

const { createAlbum, listAlbum, itemAlbum, editAlbum, deleteAlbum } = require('../controllers/albums.controller');


router.post('/albumcreate', upload.single('cover'), createAlbum);;
router.get('/albumlist', listAlbum);
router.get('/:albumitem', itemAlbum);
// router.patch('/:albumitem', editAlbum);
router.patch('/:albumitem', upload.single('cover'), editAlbum);
router.delete('/:albumitem', deleteAlbum);


module.exports = router;
