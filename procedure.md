# MySQL Database Setup and Connection Guide

Complete guide to install MySQL, connect it to your project, insert data, and perform CRUD operations.

---

## What You Need to Install

1. **MySQL Server** - Database software
2. **Node.js** - To run the project
3. **Git** - To download the project (if not already downloaded)

---

## Part 1: Install MySQL on Your PC

### For Windows:

1. **Download MySQL Installer:**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Click "Download" on the larger file (mysql-installer-web-community)
   - Click "No thanks, just start my download"

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Choose "Developer Default" setup type
   - Click "Next"

3. **Install MySQL Products:**
   - Click "Execute" button
   - Wait for all products to download and install (5-10 minutes)
   - Click "Next" when done

4. **Configure MySQL Server:**
   
   **Step 1 - Type and Networking:**
   - Config Type: "Development Computer"
   - Port: 3306 (keep default)
   - Click "Next"
   
   **Step 2 - Authentication:**
   - Select "Use Strong Password Encryption"
   - Click "Next"
   
   **Step 3 - Accounts and Roles:**
   - Enter a password for root user (example: `mypassword123`)
   - **IMPORTANT: Write down this password!**
   - Re-enter the same password to confirm
   - Click "Next"
   
   **Step 4 - Windows Service:**
   - Keep "Configure MySQL Server as a Windows Service" checked
   - Service Name: MySQL80
   - Keep "Start the MySQL Server at System Startup" checked
   - Click "Next"
   
   **Step 5 - Apply Configuration:**
   - Click "Execute"
   - Wait for all steps to complete (green checkmarks)
   - Click "Finish"

5. **Complete Installation:**
   - Click "Next" → "Finish"
   - MySQL is now installed!

### For Mac:

```bash
# Install using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation (set password)
mysql_secure_installation
```

When asked:
- Set root password: Type a password and remember it
- Remove anonymous users: Type `Y`
- Disallow root login remotely: Type `Y`
- Remove test database: Type `Y`
- Reload privilege tables: Type `Y`

### For Linux:

```bash
# Update package list
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql

# Secure installation (set password)
sudo mysql_secure_installation
```

---

## Part 2: Verify MySQL is Installed and Running

### Check if MySQL Service is Running:

**Windows:**
```bash
net start | findstr MySQL
```

You should see: `MySQL80`

If not running, start it:
```bash
net start MySQL80
```

**Mac:**
```bash
brew services list | grep mysql
```

**Linux:**
```bash
sudo systemctl status mysql
```

### Test MySQL Connection:

```bash
mysql -u root -p
```

- Type your MySQL password when asked
- If you see `mysql>` prompt, connection successful!
- Type `exit` to quit

---

## Part 3: Connect MySQL to Your Project

### Step 1: Open Your Project Folder

```bash
cd E-Commerce-Webiste
```

### Step 2: Understand the Database Files

Your project has 2 important SQL files:

1. **`server/database/schema.sql`** - Creates database structure (tables)
2. **`server/database/seed.sql`** - Inserts sample data (products)

### Step 3: Create Database Structure

Run this command from your project root folder:

```bash
mysql -u root -p < server/database/schema.sql
```

**What happens:**
1. You'll be asked for MySQL password - type it and press Enter
2. MySQL reads the `schema.sql` file
3. Creates a database called `hs_store`
4. Creates 8 tables inside it:
   - `categories` - Product categories (Footwear, Electronics, etc.)
   - `products` - All products with prices, images, ratings
   - `users` - User accounts
   - `sessions` - Login sessions
   - `cart_items` - Shopping cart contents
   - `orders` - Customer orders
   - `order_items` - Items in each order
   - `contacts` - Contact form submissions

**Verify it worked:**
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

You should see `hs_store` in the list.

### Step 4: Insert Sample Data (Products)

Run this command:

```bash
mysql -u root -p < server/database/seed.sql
```

**What happens:**
1. Inserts 7 categories (Footwear, Electronics, Accessories, Clothing, Audio, Computers, Gaming)
2. Inserts 18 products with:
   - Product names
   - Prices
   - Images
   - Ratings
   - Category assignments

**Verify it worked:**
```bash
mysql -u root -p -e "USE hs_store; SELECT COUNT(*) FROM products;"
```

You should see: `18`

### Step 5: Configure Project to Use MySQL

Open file: `server/.env`

You'll see:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
DB_NAME=hs_store
PORT=3000
```

**Change this line:**
```env
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
```

**To your actual password:**
```env
DB_PASSWORD=mypassword123
```

**Save the file.**

**What each setting means:**
- `DB_HOST=localhost` - MySQL is on your computer
- `DB_PORT=3306` - MySQL default port
- `DB_USER=root` - MySQL username
- `DB_PASSWORD=...` - Your MySQL password
- `DB_NAME=hs_store` - Database name
- `PORT=3000` - Web server port

---

## Part 4: Install Project Dependencies and Run

### Install Node.js Packages:

```bash
npm install
```

**What this installs:**
- `express` - Web server
- `mysql2` - MySQL database connector
- `cors` - Allow frontend to talk to backend
- `dotenv` - Read `.env` file

### Start the Server:

```bash
npm start
```

**You should see:**
```
H&S Store server running → http://localhost:3000
```

**Keep this terminal window open!**

### Open the Website:

Open your browser and go to:
```
http://localhost:3000
```

You should see your store with 18 products loaded from MySQL database.

---

## Part 5: View and Manage Database Data

### Open MySQL Command Line:

```bash
mysql -u root -p
```

Type your password.

### Select Your Database:

```sql
USE hs_store;
```

You should see: `Database changed`

### View All Tables:

```sql
SHOW TABLES;
```

You'll see:
```
+--------------------+
| Tables_in_hs_store |
+--------------------+
| cart_items         |
| categories         |
| contacts           |
| order_items        |
| orders             |
| products           |
| sessions           |
| users              |
+--------------------+
```

### View Table Structure:

```sql
DESCRIBE products;
```

Shows all columns in products table.

### View All Products:

```sql
SELECT * FROM products;
```

Shows all 18 products with all details.

### View Specific Columns:

```sql
SELECT id, name, price FROM products;
```

Shows only ID, name, and price.

### View Categories:

```sql
SELECT * FROM categories;
```

Shows all 7 categories.

---

## Part 6: CRUD Operations (Create, Read, Update, Delete)

### CREATE - Add New Data

**Add a New Product:**

```sql
INSERT INTO products (name, price, category_id, image_url, description, rating, stock_quantity) 
VALUES ('Nike Air Max', 129.99, 1, 'nike-air-max.jpg', 'Comfortable running shoes', 4.8, 50);
```

**Add a New Category:**

```sql
INSERT INTO categories (name, description) 
VALUES ('Sports', 'Sports equipment and gear');
```

**Verify it was added:**

```sql
SELECT * FROM products ORDER BY id DESC LIMIT 1;
```

### READ - View Data

**View All Products:**

```sql
SELECT * FROM products;
```

**View One Product by ID:**

```sql
SELECT * FROM products WHERE id = 1;
```

**View Products by Category:**

```sql
SELECT * FROM products WHERE category_id = 1;
```

**View Products Above Certain Price:**

```sql
SELECT * FROM products WHERE price > 100;
```

**View Products with High Rating:**

```sql
SELECT * FROM products WHERE rating >= 4.5;
```

**Search Products by Name:**

```sql
SELECT * FROM products WHERE name LIKE '%shoes%';
```

**View Products with Category Name:**

```sql
SELECT p.id, p.name, p.price, c.name AS category_name 
FROM products p 
JOIN categories c ON p.category_id = c.id;
```

**Count Products:**

```sql
SELECT COUNT(*) FROM products;
```

**Count Products by Category:**

```sql
SELECT c.name, COUNT(p.id) AS product_count 
FROM categories c 
LEFT JOIN products p ON c.id = p.category_id 
GROUP BY c.id;
```

### UPDATE - Change Data

**Change Product Price:**

```sql
UPDATE products SET price = 89.99 WHERE id = 1;
```

**Change Product Name:**

```sql
UPDATE products SET name = 'Updated Product Name' WHERE id = 1;
```

**Change Multiple Fields:**

```sql
UPDATE products 
SET price = 99.99, rating = 4.7, stock_quantity = 100 
WHERE id = 1;
```

**Increase All Prices by 10%:**

```sql
UPDATE products SET price = price * 1.10;
```

**Update Products in Specific Category:**

```sql
UPDATE products SET price = price * 0.9 WHERE category_id = 1;
```

**Verify the update:**

```sql
SELECT * FROM products WHERE id = 1;
```

### DELETE - Remove Data

**Delete One Product:**

```sql
DELETE FROM products WHERE id = 1;
```

**Delete Products by Category:**

```sql
DELETE FROM products WHERE category_id = 2;
```

**Delete Products Below Certain Price:**

```sql
DELETE FROM products WHERE price < 50;
```

**Delete All Products (careful!):**

```sql
DELETE FROM products;
```

**Verify deletion:**

```sql
SELECT COUNT(*) FROM products;
```

---

## Part 7: Advanced Database Operations

### Backup Your Database:

**Windows:**
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" -u root -p hs_store > backup.sql
```

**Mac/Linux:**
```bash
mysqldump -u root -p hs_store > backup.sql
```

### Restore Database from Backup:

```bash
mysql -u root -p hs_store < backup.sql
```

### Reset Database (Delete Everything and Start Fresh):

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS hs_store;"
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql
```

### View Database Size:

```sql
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'hs_store'
GROUP BY table_schema;
```

---

## Part 8: Common Problems and Solutions

### Problem 1: "Access denied for user 'root'@'localhost'"

**Cause:** Wrong password in `.env` file or wrong password when connecting

**Solution:**
1. Open `server/.env`
2. Check `DB_PASSWORD` matches your MySQL password
3. Save file and restart server (`npm start`)

### Problem 2: "Unknown database 'hs_store'"

**Cause:** Database not created yet

**Solution:**
```bash
mysql -u root -p < server/database/schema.sql
```

### Problem 3: "Table 'hs_store.products' doesn't exist"

**Cause:** Tables created but no data inserted

**Solution:**
```bash
mysql -u root -p < server/database/seed.sql
```

### Problem 4: "mysql: command not found" (Windows)

**Cause:** MySQL not in system PATH

**Solution:** Use full path:
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

Or add to PATH:
1. Search "Environment Variables" in Windows
2. Edit "Path" variable
3. Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
4. Restart terminal

### Problem 5: "Cannot GET /api/products"

**Cause:** Server not running

**Solution:**
```bash
npm start
```

### Problem 6: "Port 3000 already in use"

**Cause:** Another app using port 3000

**Solution:**
1. Open `server/.env`
2. Change `PORT=3000` to `PORT=3001`
3. Save and restart server
4. Open `http://localhost:3001`

### Problem 7: Products not showing on website

**Cause:** Frontend can't connect to backend

**Solution:**
1. Check server is running (`npm start`)
2. Open browser console (F12) and check for errors
3. Verify `.env` password is correct

---

## Quick Reference Commands

```bash
# Start MySQL service (Windows)
net start MySQL80

# Connect to MySQL
mysql -u root -p

# Create database structure
mysql -u root -p < server/database/schema.sql

# Insert sample data
mysql -u root -p < server/database/seed.sql

# Install project dependencies
npm install

# Start server
npm start

# Stop server
Press Ctrl+C

# Backup database
mysqldump -u root -p hs_store > backup.sql

# Restore database
mysql -u root -p hs_store < backup.sql

# Reset database
mysql -u root -p -e "DROP DATABASE IF EXISTS hs_store;"
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql
```

---

## Summary

**You have successfully:**
1. ✅ Installed MySQL on your PC
2. ✅ Created database connection
3. ✅ Inserted project queries (schema and data)
4. ✅ Loaded data into database
5. ✅ Learned CRUD operations (Create, Read, Update, Delete)

**Your E-Commerce website is now connected to MySQL database!**

All products, categories, users, and orders are stored in the database and persist even after closing the browser.
