const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/ideas', require('./idea'));

module.exports = router;