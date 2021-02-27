const express = require('express');
const router = express.Router();

const { createLive, deleteLive, liveList, liveItem, editLive } = require('../controllers/lives.controller');

router.post('/livecreate', createLive);
router.delete('/livedelete/:id', deleteLive);
router.get('/livelist', liveList);
// router.get('/:liveid', liveItem);
router.patch('/:liveid', editLive);

module.exports = router;