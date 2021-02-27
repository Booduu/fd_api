const express = require('express');
const router = express.Router();
const { userCreate, userLogin, userLogout } = require('../controllers/user.controller');

router.post('/', userCreate);
router.post('/login', userLogin);
router.get('/logout', userLogout);

module.exports = router;