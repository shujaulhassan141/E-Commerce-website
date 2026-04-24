const express = require('express');
const router  = express.Router();
const crypto  = require('crypto');
const db      = require('./db');

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// POST /api/users/login/phone — phone login
router.post('/login/phone', async (req, res) => {
  const { phone } = req.body;
  if (!phone || !/^\d{11}$/.test(phone)) {
    return res.status(400).json({ success: false, error: 'Valid 11-digit phone required' });
  }

  try {
    // Upsert user
    await db.query(
      `INSERT INTO users (phone) VALUES (?)
       ON DUPLICATE KEY UPDATE last_login = NOW()`,
      [phone]
    );
    const [[user]] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);

    const token = generateToken();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await db.query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expires]
    );

    res.json({ success: true, token, user: { id: user.id, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/login/google — google login simulation
router.post('/login/google', async (req, res) => {
  const { google_id, email, name } = req.body;
  if (!google_id) return res.status(400).json({ success: false, error: 'google_id required' });

  try {
    await db.query(
      `INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE email = VALUES(email), name = VALUES(name), last_login = NOW()`,
      [google_id, email || null, name || null]
    );
    const [[user]] = await db.query('SELECT * FROM users WHERE google_id = ?', [google_id]);

    const token = generateToken();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expires]
    );

    res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/me — get current user from token
router.get('/me', async (req, res) => {
  const token = req.headers['x-session-token'];
  if (!token) return res.status(401).json({ success: false, error: 'No token' });

  try {
    const [[session]] = await db.query(
      'SELECT * FROM sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    if (!session) return res.status(401).json({ success: false, error: 'Invalid or expired token' });

    const [[user]] = await db.query(
      'SELECT id, phone, email, name, created_at FROM users WHERE id = ?',
      [session.user_id]
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/logout
router.post('/logout', async (req, res) => {
  const token = req.headers['x-session-token'];
  if (token) {
    await db.query('DELETE FROM sessions WHERE token = ?', [token]).catch(() => {});
  }
  res.json({ success: true });
});

module.exports = router;
