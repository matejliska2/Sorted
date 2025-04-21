const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    updateCustomerStatus
} = require('../controllers/orderController');

const db = require('../config/db');

// ✅ FIXED: Get all customers (for manager order creation)
router.get('/customers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name FROM users WHERE role = "customer"');
        res.json(rows);
    } catch (err) {
        console.error('Failed to fetch customers:', err);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});


// Order routes
router.get('/', getAllOrders);                    // Manager
router.get('/user/:id', getUserOrders);           // Customer
router.post('/', createOrder);                    // Manager
router.put('/:id', updateOrder);                  // Manager
router.delete('/:id', deleteOrder);               // Manager
router.put('/customer/:id', updateCustomerStatus); // Customer
module.exports = router;
