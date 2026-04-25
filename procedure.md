# H&S Online Store — Setup Procedure

Complete setup guide for the full-stack e-commerce application with Node.js backend and MySQL database.

**Time to complete:** ~15 minutes  
**Difficulty:** Beginner-friendly

For project overview and architecture, see [README.md](README.md)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MySQL** 5.7+ or 8.0+ ([Download](https://dev.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/))
- A MySQL root password (set during MySQL installation)

### Verify Installation

Run these commands to verify:

```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 7.0.0 or higher
mysql --version   # Should show MySQL version
git --version     # Should show Git version
```

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/hamzasaleem22/E-Commerce-Webiste.git
cd E-Commerce-Webiste
```

You should now be in the project root directory.

---

## Step 2 — Set Up MySQL Database

### 2.1 Start MySQL Service

Ensure MySQL is running:

**Windows:**
```bash
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### 2.2 Create Database and Tables

From the project root directory, run:

```bash
mysql -u root -p < server/database/schema.sql
```

When prompted, enter your MySQL root password (****).

This creates:
- Database: `hs_store`
- 8 tables: categories, products, users, sessions, cart_items, orders, order_items, contacts

### 2.3 Seed Initial Data

```bash
mysql -u root -p < server/database/seed.sql
```

Enter your MySQL root password (****) when prompted.

This inserts:
- 7 product categories (Footwear, Electronics, Accessories, Clothing, Audio, Computers, Gaming)
- 18 products with images, prices, and ratings

---

## Step 3 — Configure Environment Variables

The backend configuration is in `server/.env`. Update it with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
DB_NAME=hs_store
PORT=3000
```

**Important:** Replace `[YOUR_MYSQL_PASSWORD]` with your actual MySQL root password.

**Security Note:** Never commit `.env` files to version control. This file is already in `.gitignore`.

---

## Step 4 — Install Node.js Dependencies

From the project root:

```bash
npm install
```

This installs:
- `express` — Web server framework
- `mysql2` — MySQL database driver with Promise support
- `cors` — Cross-origin resource sharing
- `dotenv` — Environment variable loader
- `nodemon` — Development auto-restart (dev only)

---

## Step 5 — Start the Backend Server

### Production Mode

```bash
npm start
```

### Development Mode (auto-restart on file changes)

```bash
npm run dev
```

You should see:
```
H&S Store server running → http://localhost:3000
```

**Keep this terminal window open** — the server must run continuously.

---

## Step 6 — Open the Website

Open your browser and navigate to:

```
http://localhost:3000/
```

### Available Pages

- **Home:** `http://localhost:3000/` or `http://localhost:3000/index.html`
- **Cart:** `http://localhost:3000/cart.html`
- **About:** `http://localhost:3000/about.html`
- **Contact:** `http://localhost:3000/contact.html`

---

## Step 7 — Verify Everything Works

### Test 1: Products Load from Database

1. Open `http://localhost:3000/`
2. You should see 18 products displayed
3. Open browser DevTools (F12) → Network tab
4. Refresh page
5. Look for `GET /api/products` request with status 200

### Test 2: Cart Syncs with Database

1. Click "Add to Cart" on any product
2. Open DevTools → Network tab
3. Look for `POST /api/cart` request
4. Navigate to cart page
5. Items should persist after page refresh

### Test 3: Database Contains Data

Open MySQL CLI:

```bash
mysql -u root -p hs_store
```

Enter your password (****) when prompted.

Run verification queries:

```sql
-- Check products loaded (should show 18)
SELECT COUNT(*) FROM products;

-- Check categories (should show 7)
SELECT * FROM categories;

-- Check cart items (should show items you added)
SELECT * FROM cart_items;
```

Type `exit` to leave MySQL CLI.

---

## API Endpoints Reference

The backend exposes these REST API endpoints:

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/categories/all` | List categories |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items (requires session token) |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:product_id` | Update quantity |
| DELETE | `/api/cart/:product_id` | Remove item |
| DELETE | `/api/cart` | Clear cart |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/login/phone` | Login with phone number |
| POST | `/api/users/login/google` | Login with Google |
| GET | `/api/users/me` | Get current user info |
| POST | `/api/users/logout` | Logout |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/checkout` | Place order from cart |
| GET | `/api/orders` | List user orders (requires auth) |
| GET | `/api/orders/:id` | Get order details |

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Submit contact form |
| GET | `/api/health` | Server health check |

**Authentication:** Include `x-session-token` header with requests.

---

## Troubleshooting

### "Access denied for user 'root'"

**Cause:** Incorrect MySQL password in `.env`

**Fix:** Update `DB_PASSWORD` in `server/.env` with your correct MySQL root password

---

### "Unknown database 'hs_store'"

**Cause:** Database not created

**Fix:** Run the schema file:
```bash
mysql -u root -p < server/database/schema.sql
```

---

### "Cannot GET /api/products" or "ERR_CONNECTION_REFUSED"

**Cause:** Backend server not running

**Fix:** Start the server:
```bash
npm start
```

---

### "Table 'hs_store.products' doesn't exist"

**Cause:** Tables created but not seeded

**Fix:** Run seed file:
```bash
mysql -u root -p < server/database/seed.sql
```

---

### "Port 3000 already in use"

**Cause:** Another application using port 3000

**Fix Option 1:** Stop the other application

**Fix Option 2:** Change port in `server/.env`:
```env
PORT=3001
```

Then update `API_BASE` in `public/js/cart.js`:
```javascript
var API_BASE = 'http://localhost:3001/api';
```

---

### Products don't appear on homepage

**Cause:** Frontend not connecting to backend

**Fix:**
1. Check server is running (`npm start`)
2. Open DevTools → Console for errors
3. Check Network tab for failed API requests
4. Verify `API_BASE` in `public/js/cart.js` matches your server port

---

### Cart items disappear after refresh

**Cause:** Backend not saving to database

**Fix:**
1. Check server logs for errors
2. Verify MySQL is running
3. Check `.env` credentials are correct
4. Test database connection:
```bash
mysql -u root -p -e "USE hs_store; SELECT COUNT(*) FROM cart_items;"
```

---

## Offline Mode (Frontend Only)

The website can run without the backend server:

### How to Use

Simply open `public/index.html` directly in your browser (no server needed).

### What Works

- Product display (hardcoded in HTML)
- Cart functionality (localStorage only)
- Login modal (visual only, not saved)
- All styling and animations

### What Doesn't Work

- Products won't load from database
- Cart won't persist across devices
- Login won't create sessions
- Contact form won't save to database
- Orders won't be recorded

### Use Cases

- Frontend development
- Design testing
- Demo without database setup
- Offline browsing

---

## Next Steps

- **Development:** Modify files in `public/` (frontend) or `server/` (backend)
- **Database:** Use MySQL Workbench or CLI to view/edit data
- **API Testing:** Use Postman or curl to test endpoints
- **Deployment:** See deployment guides for production hosting

For project overview and architecture, see [README.md](README.md)
