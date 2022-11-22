const express = require('express');
const router = express.Router();

const { register, login, loggedUser } = require('../controller/auth.controller');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, loggedUser);

module.exports = router;