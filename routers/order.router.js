const express = require ('express');
const router = express.Router();

const controller = require('../controllers/orders.controller');

router.get('/get', controller.getOrders);
router.get('/find', controller.getOrder);
router.post('/add', controller.addOrder);
router.post('/update', controller.updateOrder);
router.post('/verifiedOrder', controller.verifiedOrder);
router.get('/delete', controller.deleteOrder);

module.exports = router;