const express = require('express');
const router = express.Router();

const controller = require ('../controllers/vendors.controller')

// /vendors/
router.get('/get', controller.getVendor);
router.get('/list', controller.getAllVendor);
router.post('/add', controller.addVendor);
router.post('/update', controller.updateVendor);
router.get('/delete', controller.deleteVendor);

module.exports = router;