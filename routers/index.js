const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt.middleware');

router.use('/auth', require('./auth.router'));
router.use('/inventory', jwt.verify, require('./inventory.router'));
router.use('/vendors', jwt.verify, require('./vendors.router'));
router.use('/accounts', [jwt.verify, jwt.isAdmin], require('./account.router'));
router.use('/orders', jwt.verify, require('./order.router'));
router.use('/report', jwt.verify, require('./report.router'));
router.use('/inbox', jwt.verify, require('./inbox.router'));

module.exports = router;