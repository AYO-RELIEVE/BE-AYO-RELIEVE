const express = require('express');
const router = express.Router();

const { register, login, loggedUser } = require('../controller/auth.controller');
const auth = require('../middleware/auth');
const { upload } = require('../middleware');

router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.get('/me', auth, loggedUser);

module.exports = router;