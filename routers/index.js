const express = require('express');
const router = express.Router();

router.use('/auth', require('routers/auth.router'));
router.use('/items', require('routers/item.router'));
router.use('/vendors', require('routers/vendor.router'));
router.use('/report', require('routers/report.router'));
router.use('/orders', require('routers/order.router'));

module.exports = router;