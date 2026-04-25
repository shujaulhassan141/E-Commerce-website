# H&S Online Store — Setup Procedure

Complete setup guide for the full-stack e-commerce application with Node.js backend and MySQL database.

**Time to complete:** ~15 minutes  
**Difficulty:** Beginner-friendly

For project overview and architecture, see [README.md](README.md)

---

## Prerequisites

Before starting, you need to install:

- **Node.js** v16 or higher
- **MySQL** 5.7+ or 8.0+
- **Git**

---

## Step 1 — Install Node.js

### Windows

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (recommended for most users)
3. Run the installer (`.msi` file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Keep default installation path: `C:\Program Files\nodejs\`
   - Check "Automatically install necessary tools" (installs build tools)
5. Click "Install" and wait for completion
6. Restart your terminal/command prompt

### macOS

**Option 1: Official Installer**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version**
3. Run the `.pkg` installer
4. Follow the installation wizard

**Option 2: Homebrew**
```bash
brew install node
```

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Verify Node.js Installation

Open a **new** terminal and run:

```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 7.0.0 or higher
```

If commands not found, restart your computer and try again.

---

## Step 2 — Install MySQL

### Windows

1. Go to [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Download **MySQL Installer for Windows** (larger "web" version recommended)
3. Run the installer (`.msi` file)
4. Choose setup type:
   - Select **"Developer Default"** (includes MySQL Server, Workbench, and tools)
   - Click "Next"
5. Click "Execute" to download and install all products
6. **Configuration steps:**
   - **Type and Networking:**
     - Config Type: Development Computer
     - Port: 3306 (default)
     - Click "Next"
   - **Authentication Method:**
     - Select "Use Strong Password Encryption" (recommended)
     - Click "Next"
   - **Accounts and Roles:**
     - Set MySQL Root Password: **Choose a strong password and remember it**
     - Write it down: `____________________`
     - Click "Next"
   - **Windows Service:**
     - Keep "Configure MySQL Server as a Windows Service" checked
     - Service Name: MySQL80
     - Start at System Startup: Checked
     - Click "Next"
   - Click "Execute" to apply configuration
7. Click "Finish" when complete

### macOS

**Using Homebrew (Recommended):**

```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation (set root password)
mysql_secure_installation
```

When prompted:
- Set root password: **Choose a strong password and remember it**
- Remove anonymous users: Yes
- Disallow root login remotely: Yes
- Remove test database: Yes
- Reload privilege tables: Yes

**Using Official Installer:**
1. Go to [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Download MySQL Community Server for macOS
3. Run the `.dmg` installer
4. Follow installation wizard and set root password

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql

# Secure installation (set root password)
sudo mysql_secure_installation
```

When prompted:
- Set root password: **Choose a strong password and remember it**
- Remove anonymous users: Yes
- Disallow root login remotely: Yes
- Remove test database: Yes
- Reload privilege tables: Yes

### Verify MySQL Installation

**Windows:**
```bash
# Check if MySQL service is running
net start | findstr MySQL

# Test MySQL connection (enter your root password when prompted)
mysql -u root -p -e "SELECT VERSION();"
```

**macOS/Linux:**
```bash
# Check if MySQL service is running
brew services list | grep mysql    # macOS
sudo systemctl status mysql        # Linux

# Test MySQL connection (enter your root password when prompted)
mysql -u root -p -e "SELECT VERSION();"
```

You should see MySQL version information. If you see "Access denied" or "command not found", see Troubleshooting section.

---

## Step 3 — Install Git

### Windows

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the installer
3. Run the installer
4. Follow the wizard (keep default settings)
5. Restart your terminal

### macOS

**Option 1: Xcode Command Line Tools**
```bash
xcode-select --install
```

**Option 2: Homebrew**
```bash
brew install git
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### Verify Git Installation

```bash
git --version    # Should show Git version
```

---

## Step 4 — Clone the Repository

```bash
git clone https://github.com/hamzasaleem22/E-Commerce-Webiste.git
cd E-Commerce-Webiste
```

You should now be in the project root directory.

---

## Step 5 — Set Up MySQL Database

### 5.1 Verify MySQL is Running

Ensure MySQL service is running:

**Windows:**
```bash
net start MySQL80
```

If already running, you'll see "The requested service has already been started."

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
sudo systemctl status mysql    # Check status
```

### 5.2 Create Database and Tables

From the project root directory, run:

```bash
mysql -u root -p < server/database/schema.sql
```

When prompted, enter your MySQL root password (****).

This creates:
- Database: `hs_store`
- 8 tables: categories, products, users, sessions, cart_items, orders, order_items, contacts

### 5.3 Seed Initial Data

```bash
mysql -u root -p < server/database/seed.sql
```

Enter your MySQL root password (****) when prompted.

This inserts:
- 7 product categories (Footwear, Electronics, Accessories, Clothing, Audio, Computers, Gaming)
- 18 products with images, prices, and ratings

---

## Step 6 — Configure Environment Variables

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

## Step 7 — Install Node.js Dependencies

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

## Step 8 — Start the Backend Server

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

## Step 9 — Open the Website

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

## Step 10 — Verify Everything Works

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

### "mysql: command not found" (Windows)

**Cause:** MySQL bin directory not in system PATH

**Fix:**

1. Find MySQL installation path (usually `C:\Program Files\MySQL\MySQL Server 8.0\bin\`)
2. Add to PATH:
   - Open System Properties → Environment Variables
   - Under "System variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - Click "OK" on all windows
3. **Restart your terminal** (important!)
4. Test: `mysql --version`

**Alternative:** Use full path:
```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

---

### "mysql: command not found" (macOS/Linux)

**Cause:** MySQL not installed or not in PATH

**Fix:**

**macOS:**
```bash
# If installed via Homebrew
brew link mysql

# Add to PATH in ~/.zshrc or ~/.bash_profile
echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Linux:**
```bash
# Check if MySQL is installed
dpkg -l | grep mysql-server

# If not installed
sudo apt install mysql-server

# If installed but not in PATH
export PATH=$PATH:/usr/bin
```

---

### "Access denied for user 'root'@'localhost'"

**Cause:** Wrong password or root user not configured

**Fix:**

**Windows:**
1. Stop MySQL service: `net stop MySQL80`
2. Start MySQL in safe mode (skip grant tables)
3. Reset root password
4. Restart MySQL service: `net start MySQL80`

**macOS/Linux:**
```bash
# Stop MySQL
sudo systemctl stop mysql    # Linux
brew services stop mysql     # macOS

# Start in safe mode
sudo mysqld_safe --skip-grant-tables &

# Connect without password
mysql -u root

# Reset password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
FLUSH PRIVILEGES;
exit;

# Restart MySQL normally
sudo systemctl start mysql    # Linux
brew services start mysql     # macOS
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
