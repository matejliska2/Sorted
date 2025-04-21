const db = require('../config/db');

// Get all orders (Manager)
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
              orders.id,
              users.name AS customer_name,
              orders.title,
              orders.customer_status,
              orders.created_at
            FROM orders
            JOIN users ON orders.user_id = users.id
            ORDER BY orders.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get customer-specific orders
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const [results] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
};

// Create order (Manager)
exports.createOrder = async (req, res) => {
    try {
        const { user_id, title, description, status } = req.body;
        await db.query(
            'INSERT INTO orders (user_id, title, description, status) VALUES (?, ?, ?, ?)',
            [user_id, title, description, status]
        );
        res.json({ message: 'Order created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Update order (Manager)
exports.updateOrder = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const orderId = req.params.id;
        await db.query(
            'UPDATE orders SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, orderId]
        );
        res.json({ message: 'Order updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// Delete order (Manager)
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
        res.json({ message: 'Order deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

// Customer updates their status
exports.updateCustomerStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { customer_status } = req.body;
        await db.query(
            'UPDATE orders SET customer_status = ? WHERE id = ?',
            [customer_status, orderId]
        );
        res.json({ message: 'Customer status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update customer status' });
    }
};
