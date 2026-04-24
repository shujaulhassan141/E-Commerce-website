const express = require('express');
const router  = express.Router();
const db      = require('./db');

function getToken(req) {
  return req.headers['x-session-token'] || null;
}

// GET /api/cart — get cart items for session
router.get('/', async (req, res) => {
  const token = getToken(req);
  if (!token) return res.json({ success: true, items: [] });

  try {
    const [rows] = await db.query(
      `SELECT ci.id, ci.quantity, ci.added_at,
              p.id AS product_id, p.name, p.price, p.image_url
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.session_token = ?`,
      [token]
    );
    res.json({ success: true, items: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/cart — add or increment item
router.post('/', async (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(400).json({ success: false, error: 'No session token' });

  const { product_id, quantity = 1 } = req.body;
  if (!product_id) return res.status(400).json({ success: false, error: 'product_id required' });

  try {
    await db.query(
      `INSERT INTO cart_items (session_token, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [token, product_id, quantity]
    );
    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/cart/:product_id — set exact quantity
router.put('/:product_id', async (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(400).json({ success: false, error: 'No session token' });

  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    // quantity = 0 → remove
    await db.query(
      'DELETE FROM cart_items WHERE session_token = ? AND product_id = ?',
      [token, req.params.product_id]
    );
    return res.json({ success: true, message: 'Item removed' });
  }

  try {
    await db.query(
      `UPDATE cart_items SET quantity = ?
       WHERE session_token = ? AND product_id = ?`,
      [quantity, token, req.params.product_id]
    );
    res.json({ success: true, message: 'Quantity updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/cart/:product_id — remove single item
router.delete('/:product_id', async (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(400).json({ success: false, error: 'No session token' });

  try {
    await db.query(
      'DELETE FROM cart_items WHERE session_token = ? AND product_id = ?',
      [token, req.params.product_id]
    );
    res.json({ success: true, message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/cart — clear entire cart
router.delete('/', async (req, res) => {
  const token = getToken(req);
  if (!token) return res.json({ success: true });

  try {
    await db.query('DELETE FROM cart_items WHERE session_token = ?', [token]);
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
