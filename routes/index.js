const transactionController = require('../controllers/transaction');
const express = require('express');
const router = express.Router();


    router.get('/transactions', transactionController.getTransactions);
    router.post('/transactions', transactionController.transaction);


    module.exports = router;