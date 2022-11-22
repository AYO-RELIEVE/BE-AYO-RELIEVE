const express = require('express');
const router = express.Router();

const { auth, roles } = require("../middleware");
const { index, show, create, update, destroy } = require('../controller/categories.controller');

router.get('/', index);
router.get('/:id', show);
router.post('/', auth, roles('admin'), create);
router.put('/:id', auth, roles('admin'), update);
router.delete('/:id', auth, roles('admin'), destroy);

module.exports = router;