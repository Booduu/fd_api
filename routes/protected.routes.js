const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { extractUserFromToken } = require('../config/verifyToken');


router.get('/', extractUserFromToken, (req, res) => {
    console.log('ddddd', req.user)
    res.json(req.user)
})


module.exports = router;