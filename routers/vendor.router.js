const express = require('express');
const router = express.Router();

const controller = require ('../controllers/vendors.controller')

router.get('/get', controller.getVendors);
router.get('/find', controller.getAllVendor);
router.post('/add', controller.addVendor);
router.post('/update', controller.updateVendor);
router.get('/delete', controller.deleteVendor);

module.export = router;