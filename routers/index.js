const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt.middleware');

router.use('/auth', require('./auth.router'));
router.use('/inventory', jwt.verify, require('./inventory.router'));
router.use('/vendors', require('./vendors.router'));
/* router.use('/report', require('./report.router')); */
router.use('/orders', require('./order.router'));
router.use('/report', require('./report.router'));
router.use('/inbox', require('./inbox.router'));

module.exports = router;