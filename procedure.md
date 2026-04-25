# MySQL Database Setup Guide

Simple guide to connect MySQL to your E-Commerce project.

---

## Step 1: Install MySQL

Download and install MySQL from: https://dev.mysql.com/downloads/installer/

**During installation:**
- Choose "Developer Default"
- Set a password (remember this!)
- Click Next until finished

---

## Step 2: Open Your Project

Open terminal in your project folder:

```bash
cd E-Commerce-Webiste
```

---

## Step 3: Create Database

Run this command:

```bash
mysql -u root -p < server/database/schema.sql
```

Type your MySQL password when asked.

**This creates the database with all tables.**

---

## Step 4: Add Products Data

Run this command:

```bash
mysql -u root -p < server/database/seed.sql
```

Type your MySQL password.

**This adds 18 products to your database.**

---

## Step 5: Connect Database to Project

Open file: `server/.env`

Change this line:
```
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
```

Put your actual MySQL password:
```
DB_PASSWORD=yourpassword
```

Save the file.

---

## Step 6: Install and Run

```bash
npm install
npm start
```

Open browser: http://localhost:3000

**Done! Your website now uses MySQL database.**

---

## View Database Data

Open MySQL:

```bash
mysql -u root -p
```

Enter password, then:

```sql
USE hs_store;
SELECT * FROM products;
```

You'll see all 18 products.

---

## CRUD Operations

### See Data (READ)

```sql
-- All products
SELECT * FROM products;

-- One product
SELECT * FROM products WHERE id = 1;

-- Products by category
SELECT * FROM products WHERE category_id = 2;
```

### Add Data (CREATE)

```sql
-- Add new product
INSERT INTO products (name, price, category_id, image_url, rating) 
VALUES ('New Shoes', 89.99, 1, 'shoes.jpg', 4.5);
```

### Change Data (UPDATE)

```sql
-- Change price
UPDATE products SET price = 69.99 WHERE id = 1;

-- Change name
UPDATE products SET name = 'New Name' WHERE id = 1;
```

### Remove Data (DELETE)

```sql
-- Delete one product
DELETE FROM products WHERE id = 1;

-- Delete by category
DELETE FROM products WHERE category_id = 2;
```

---

## Common Issues

**"Access denied"**
- Fix: Check password in `server/.env` file

**"Unknown database"**
- Fix: Run `mysql -u root -p < server/database/schema.sql` again

**"Cannot GET /api/products"**
- Fix: Run `npm start`

**"Port 3000 in use"**
- Fix: Change `PORT=3001` in `server/.env`

---

## Quick Reference

```bash
# Create database
mysql -u root -p < server/database/schema.sql

# Add data
mysql -u root -p < server/database/seed.sql

# Start server
npm start

# View database
mysql -u root -p hs_store
```

---

That's it! Your MySQL database is connected and working.
