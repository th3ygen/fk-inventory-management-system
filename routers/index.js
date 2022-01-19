const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.router'));
router.use('/inventory', require('./inventory.router'));
router.use('/vendors', require('./vendors.router'));
router.use('/accounts', require('./account.router'));
/* router.use('/report', require('./report.router')); */
router.use('/orders', require('./order.router'));
router.use('/report', require('./report.router'));

module.exports = router;