const express = require('express');
const router  = express.Router();
const db      = require('./db');

// POST /api/orders/checkout — place order from current cart
router.post('/checkout', async (req, res) => {
  const token = req.headers['x-session-token'];
  if (!token) return res.status(400).json({ success: false, error: 'No session token' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Get cart items
    const [items] = await conn.query(
      `SELECT ci.quantity, p.id AS product_id, p.name, p.price
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.session_token = ?`,
      [token]
    );

    if (!items.length) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    // Compute totals
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = subtotal * 0.20;
    const total    = subtotal - discount;

    // Resolve user_id from session token (may be null for guests)
    let user_id = null;
    const [[session]] = await conn.query(
      'SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    if (session) user_id = session.user_id;

    // Insert order
    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, session_token, subtotal, discount, total)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, token, subtotal.toFixed(2), discount.toFixed(2), total.toFixed(2)]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    // Clear cart
    await conn.query('DELETE FROM cart_items WHERE session_token = ?', [token]);

    await conn.commit();
    conn.release();

    res.json({
      success: true,
      order: { id: orderId, subtotal, discount, total, status: 'pending' }
    });
  } catch (err) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders — list orders for logged-in user
router.get('/', async (req, res) => {
  const token = req.headers['x-session-token'];
  if (!token) return res.status(401).json({ success: false, error: 'Login required' });

  try {
    const [[session]] = await db.query(
      'SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    if (!session) return res.status(401).json({ success: false, error: 'Invalid session' });

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [session.user_id]
    );
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id — single order with items
router.get('/:id', async (req, res) => {
  try {
    const [[order]] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    const [items] = await db.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [req.params.id]
    );
    res.json({ success: true, order, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
