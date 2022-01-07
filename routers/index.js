const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.router'));
router.use('/items', require('./item.router'));
router.use('/vendors', require('./vendors.router'));
/* router.use('/report', require('./report.router')); */
router.use('/orders', require('./order.router'));

module.exports = router;