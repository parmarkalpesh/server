const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const invoiceRoutes = require('./routes/invoiceRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Request logging
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/invoices', invoiceRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// 404 Handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;

// Only listen if not in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
