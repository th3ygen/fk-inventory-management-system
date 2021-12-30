const express = require('express');
const router = express.Router();

const controller = require('../../controllers/device.controller');

router.get('/list', controller.getAll);
router.get('/data', controller.getData);
router.get('/data/time-range', controller.getDataInTimeRange);
router.get('/data/average', controller.getAverage);

module.exports = router;