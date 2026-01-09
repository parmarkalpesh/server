const Invoice = require('../models/Invoice');

// Get all invoices
exports.getInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.json(invoices);
    } catch (err) {
        next(err);
    }
};

// Save a new invoice
exports.createInvoice = async (req, res, next) => {
    try {
        const invoiceData = req.body;

        // Generate invoice number
        const invoiceNumber = `INV-${Date.now()}`;

        const invoice = new Invoice({
            ...invoiceData,
            invoiceNumber
        });

        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (err) {
        next(err);
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            const error = new Error('Invoice not found');
            error.status = 404;
            throw error;
        }
        res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
        next(err);
    }
};
