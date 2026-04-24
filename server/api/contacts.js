const express = require('express');
const router  = express.Router();
const db      = require('./db');

// POST /api/contacts — save contact form message
router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, subject, message } = req.body;

  if (!first_name || !email || !message) {
    return res.status(400).json({ success: false, error: 'first_name, email, and message required' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  }

  try {
    await db.query(
      `INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name || null, email, phone || null, subject || null, message]
    );
    res.json({ success: true, message: 'Message saved' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/contacts — admin: list all messages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, contacts: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
