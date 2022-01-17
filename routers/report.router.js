const express = require("express");
const router = express.Router();

router.get('/getmostsold', require('../controllers/report.controller').getMostSold);
router.get('/getleastsold', require('../controllers/report.controller').getLeastSold);

module.exports = router;