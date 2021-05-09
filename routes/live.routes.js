const express = require('express');
const router = express.Router();

const { liveList } = require('../controllers/lives.controller');


router.get('/livelist', liveList);


module.exports = router;