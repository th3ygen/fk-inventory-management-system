const express = require("express");
const router = express.Router();

router.get('/getmostsold', require('../controllers/report.controller').getMostSold);
router.get('/getleastsold', require('../controllers/report.controller').getLeastSold);

router.get('/weeklysales', require('../controllers/inventory.controller').getWeeklySales);

module.exports = router;