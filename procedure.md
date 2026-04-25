# H&S Online Store — Setup Guide

Simple step-by-step guide to connect MySQL database to your project.

**Time:** 10-15 minutes  
**Level:** Beginner

---

## What You Need

- Node.js installed
- MySQL installed
- This project downloaded

---

## Step 1: Install MySQL

### Windows

1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Run the installer
3. Choose "Developer Default"
4. Click "Next" → "Execute" → Wait for installation
5. **Important:** When asked for password, set a password and remember it
6. Click "Next" until finished

### Mac

```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

Set a password when asked.

### Linux

```bash
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

Set a password when asked.

---

## Step 2: Check MySQL is Running

Open terminal/command prompt:

**Windows:**
```bash
net start MySQL80
```

**Mac/Linux:**
```bash
mysql --version
```

You should see MySQL version number.

---

## Step 3: Open Project Folder

```bash
cd E-Commerce-Webiste
```

Make sure you're in the project folder.

---

## Step 4: Create Database

Run this command (replace `****` with your MySQL password):

```bash
mysql -u root -p < server/database/schema.sql
```

When it asks for password, type your MySQL password and press Enter.

**What this does:** Creates a database called `hs_store` with 8 tables.

---

## Step 5: Add Sample Data

Run this command:

```bash
mysql -u root -p < server/database/seed.sql
```

Enter your MySQL password when asked.

**What this does:** Adds 18 products and 7 categories to your database.

---

## Step 6: Connect Database to Project

Open file: `server/.env`

Change this line:
```
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
```

To your actual password. Example:
```
DB_PASSWORD=mypassword123
```

**Save the file.**

---

## Step 7: Install Project Dependencies

```bash
npm install
```

Wait for it to finish.

---

## Step 8: Start the Server

```bash
npm start
```

You should see:
```
H&S Store server running → http://localhost:3000
```

**Keep this window open!**

---

## Step 9: Open Website

Open your browser and go to:
```
http://localhost:3000
```

You should see the store with 18 products.

---

## Step 10: View Database Data

Open terminal and run:

```bash
mysql -u root -p
```

Enter your password.

Then type these commands:

```sql
USE hs_store;

-- See all products
SELECT * FROM products;

-- See all categories
SELECT * FROM categories;

-- Exit
exit;
```

---

## How to Do CRUD Operations

### View Data (READ)

```sql
-- See all products
SELECT * FROM products;

-- See one product
SELECT * FROM products WHERE id = 1;

-- See products by category
SELECT * FROM products WHERE category_id = 2;
```

### Add Data (CREATE)

```sql
-- Add a new product
INSERT INTO products (name, price, category_id, image_url, rating) 
VALUES ('New Product', 99.99, 1, 'image.jpg', 4.5);
```

### Update Data (UPDATE)

```sql
-- Change product price
UPDATE products SET price = 79.99 WHERE id = 1;

-- Change product name
UPDATE products SET name = 'Updated Name' WHERE id = 1;
```

### Delete Data (DELETE)

```sql
-- Delete a product
DELETE FROM products WHERE id = 1;

-- Delete all products in a category
DELETE FROM products WHERE category_id = 2;
```

---

## Common Problems

### "Access denied for user 'root'"

**Problem:** Wrong password in `.env` file

**Fix:** Open `server/.env` and check `DB_PASSWORD` matches your MySQL password

---

### "Unknown database 'hs_store'"

**Problem:** Database not created

**Fix:** Run this again:
```bash
mysql -u root -p < server/database/schema.sql
```

---

### "Cannot GET /api/products"

**Problem:** Server not running

**Fix:** Run:
```bash
npm start
```

---

### "mysql: command not found"

**Problem:** MySQL not in PATH (Windows)

**Fix:** Use full path:
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

---

### "Port 3000 already in use"

**Problem:** Another app using port 3000

**Fix:** Change port in `server/.env`:
```
PORT=3001
```

Then open: `http://localhost:3001`

---

## Quick Commands Reference

```bash
# Start server
npm start

# Stop server
Press Ctrl+C

# Open MySQL
mysql -u root -p

# Create database
mysql -u root -p < server/database/schema.sql

# Add sample data
mysql -u root -p < server/database/seed.sql

# View database
mysql -u root -p hs_store
```

---

## What Each File Does

- `server/database/schema.sql` — Creates database structure (tables)
- `server/database/seed.sql` — Adds sample products
- `server/.env` — Database password and settings
- `server/server.js` — Starts the web server
- `server/api/` — Handles database operations (CRUD)

---

## Done!

Your store is now connected to MySQL database. Products are stored in the database and will stay even after you close the browser.
