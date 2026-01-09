const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/', invoiceController.getInvoices);
router.post('/', invoiceController.createInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
