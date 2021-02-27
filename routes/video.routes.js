const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('vvvvideo');
    res.sendFile('../assets/video/background_video.mp4', { root: __dirname });
    // res.sendFile(path.resolve('../assets/video/background_video.mp4'));
});

module.exports = router;
