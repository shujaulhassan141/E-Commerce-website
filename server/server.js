require('dotenv').config({ path: __dirname + '/.env' });
const express  = require('express');
const cors     = require('cors');
const path     = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files from public/
app.use(express.static(path.resolve(__dirname, '../public')));

// API routes
app.use('/api/products',  require('./api/products'));
app.use('/api/cart',      require('./api/cart'));
app.use('/api/users',     require('./api/users'));
app.use('/api/orders',    require('./api/orders'));
app.use('/api/contacts',  require('./api/contacts'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`H&S Store server running → http://localhost:${PORT}`);
});
