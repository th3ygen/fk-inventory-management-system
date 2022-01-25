const express = require('express');
const router = express.Router();

const controller = require ('../controllers/account.controller')

// /accounts
router.get('/get', controller.getAccounts);
router.get('/find/:account_ID', controller.getAccount);
router.post('/add', controller.addAccount);
router.post('/update', controller.updateAccount);
router.get('/delete/:id', controller.deleteAccount);
router.post('/updatepassword/:id', controller.updatePassword);

module.exports = router;
