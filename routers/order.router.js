const express = require ('express');
const router = express.Router();

const controller = require('../controllers/orders.controller');

router.get('/get', controller.getOrders);
router.get('/find/:id', controller.getOrder);

router.post('/requestDelete/:id', controller.requestDelete);
router.post('/add', controller.addOrder);
router.post('/update', controller.updateOrder);
router.post('/verifiedOrder', controller.verifiedOrder);
router.delete('/delete/:id', controller.deleteOrder);

module.exports = router;