# H&S Online Store — MySQL Database Setup Procedure

## Prerequisites

- MySQL installed locally (root password: configured in `.env`)
- Node.js installed (`node -v` → should show v16+)
- MySQL running as a service

---

## Step 1 — Clone / Switch to the correct branch

```bash
git checkout feat/mysql-database-integration
```

---

## Step 2 — Create the database and tables

Open MySQL CLI and run the schema file:

```bash
mysql -u root -p < server/database/schema.sql
```

Enter your MySQL root password when prompted (`saram`).

This creates:

| Table         | Purpose                          |
|---------------|----------------------------------|
| `categories`  | Product categories               |
| `products`    | All 18 store products            |
| `users`       | Registered users (phone/google)  |
| `sessions`    | Login session tokens             |
| `cart_items`  | Server-side persistent cart      |
| `orders`      | Placed orders                    |
| `order_items` | Items inside each order          |
| `contacts`    | Contact form submissions         |

---

## Step 3 — Seed the products

```bash
mysql -u root -p < server/database/seed.sql
```

This inserts:
- 7 categories (Footwear, Electronics, Accessories, Clothing, Audio, Computers, Gaming)
- All 18 products (Shoes Mirrels, Smart Watch, Gaming Laptop, MacBook Air, etc.)

---

## Step 4 — Install Node.js dependencies

```bash
npm install
```

Installs: `express`, `mysql2`, `cors`, `dotenv`, `nodemon`

---

## Step 5 — Configure environment

The `.env` file is located in `server/.env` with the correct config:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=saram
DB_NAME=hs_store
PORT=3000
```

If your MySQL password is different, update `DB_PASSWORD` in `.env`.

---

## Step 6 — Start the server

```bash
# Production
node server/server.js

# Development (auto-restart on file changes)
cd server && npm run dev
```

Server starts at: **http://localhost:3000**

---

## Step 7 — Open the website

Open your browser and go to:

```
http://localhost:3000/index.html
```

The website now:
- Loads (cart syncs with MySQL on each page load)
- Saves cart items to MySQL on every Add to Cart
- Saves user login sessions to MySQL
- Saves contact form submissions to MySQL
- Places real orders in MySQL on checkout

---

## API Endpoints Reference

| Method | URL                          | What it does                      |
|--------|------------------------------|-----------------------------------|
| GET    | `/api/products`              | List all products                 |
| GET    | `/api/products/:id`          | Single product                    |
| GET    | `/api/cart`                  | Get cart (by session token)       |
| POST   | `/api/cart`                  | Add item to cart                  |
| PUT    | `/api/cart/:product_id`      | Update item quantity              |
| DELETE | `/api/cart/:product_id`      | Remove item from cart             |
| DELETE | `/api/cart`                  | Clear entire cart                 |
| POST   | `/api/users/login/phone`     | Login with phone number           |
| POST   | `/api/users/login/google`    | Login with Google                 |
| GET    | `/api/users/me`              | Get logged-in user info           |
| POST   | `/api/users/logout`          | Logout                            |
| POST   | `/api/orders/checkout`       | Place order from cart             |
| GET    | `/api/orders`                | List orders (logged-in user)      |
| GET    | `/api/orders/:id`            | Single order with items           |
| POST   | `/api/contacts`              | Save contact form message         |
| GET    | `/api/health`                | Server health check               |

---

## Verifying the database is working

```bash
mysql -u root -p hs_store
```

```sql
-- Check products loaded
SELECT id, name, price FROM products;

-- Check cart items after browsing
SELECT * FROM cart_items;

-- Check orders after checkout
SELECT * FROM orders;

-- Check contact messages
SELECT * FROM contacts;
```

---

## How session tokens work

- Every browser gets a random `hs_session` token stored in `localStorage`
- This token is sent as `x-session-token` header with every API request
- Cart items are stored in `cart_items` table linked to this token
- After login, the token becomes a real session token from the `sessions` table
- Guest cart (from before login) persists in `cart_items` by the same token

---

## Offline / Fallback behavior

If the Node.js server is not running:
- Cart still works via `localStorage` (no MySQL)
- Login still works visually (not saved to DB)
- Contact form shows success (not saved to DB)

This allows front-end development without always needing the server running.

---

## Troubleshooting

**"Access denied for user root"**  
→ Check `DB_PASSWORD` in `.env`

**"Unknown database hs_store"**  
→ Re-run `mysql -u root -p < database/schema.sql`

**"Cannot connect to server" in browser**  
→ Make sure `node server.js` is running

**"Table doesn't exist"**  
→ Run schema.sql before seed.sql

**Port 3000 already in use**  
→ Change `PORT=3001` in `.env` and update `API_BASE` in `js/cart.js`
