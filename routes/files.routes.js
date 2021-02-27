const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('aaaaaa', req.body)
            cb(null, path.join('./assets/uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
});


router.post('/cover', upload.single('cover'), (req, res, next) => {
    console.log('req.files.filename', req.file.filename);
    console.log('req.', req.body);
   
});


module.exports = router;