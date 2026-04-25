# H&S Online Store — Full-Stack E-Commerce Application

A complete e-commerce web application with Node.js backend, MySQL database, and responsive frontend. Features dual-mode operation: full database integration when online, localStorage fallback when offline.

Developed by **Hamza Saleem** and **Shuja ul Hassan**.

---

## Quick Start

**Full-Stack Mode (Recommended):**

See [procedure.md](procedure.md) for complete setup instructions including MySQL database configuration and backend server.

**Static Mode (Frontend Only):**

Open `public/index.html` directly in your browser — cart uses localStorage, no server needed.

---

## Features

### Frontend
- **Product Catalog** — 18 products across 7 categories with images, prices, and ratings
- **Shopping Cart** — Add, remove, adjust quantities; live subtotal and total calculation
- **User Authentication** — Phone number and Google login flows
- **Responsive Design** — Mobile-friendly layout with CSS Grid and media queries
- **3D Animated Logo** — Pure CSS cube animation in navbar
- **Dark Theme** — Full dark UI with red accent color

### Backend
- **REST API** — Express.js server with CORS support
- **MySQL Database** — 8 tables for products, users, cart, orders, and contacts
- **Session Management** — Token-based authentication with x-session-token header
- **Cart Persistence** — Database-backed cart synced across devices
- **Order Processing** — Checkout flow with order history

### Dual-Mode Operation
- **Online:** Full API integration with MySQL database persistence
- **Offline:** Automatic fallback to localStorage for cart functionality
- **Seamless:** Frontend detects server availability and adapts

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Responsive UI, animations, cart logic |
| **Backend** | Node.js, Express.js | REST API server, routing, middleware |
| **Database** | MySQL 8.0 | Data persistence, relational storage |
| **Session** | Custom token system | Authentication, cart association |
| **Config** | dotenv | Environment variable management |

---

## Project Structure

```
E-Commerce-Webiste/
├── public/                      # Frontend (served statically)
│   ├── index.html              # Home page with product grid
│   ├── cart.html               # Shopping cart page
│   ├── about.html              # About page
│   ├── contact.html            # Contact form
│   ├── css/
│   │   ├── styles.css          # Main stylesheet
│   │   └── responsive.css      # Media queries
│   ├── js/
│   │   └── cart.js             # Cart logic with API integration
│   └── assets/                 # Images and static files
│
├── server/                      # Backend (Node.js + Express)
│   ├── server.js               # Main server entry point
│   ├── .env                    # Database credentials (gitignored)
│   ├── api/
│   │   ├── db.js               # MySQL connection pool
│   │   ├── products.js         # Product endpoints
│   │   ├── cart.js             # Cart CRUD operations
│   │   ├── users.js            # Authentication endpoints
│   │   ├── orders.js           # Order processing
│   │   └── contacts.js         # Contact form handler
│   └── database/
│       ├── schema.sql          # Database structure (8 tables)
│       └── seed.sql            # Initial data (7 categories, 18 products)
│
├── package.json                # Node.js dependencies
├── procedure.md                # Setup instructions
└── README.md                   # This file
```

---

## Architecture

### Database Schema

The application uses 8 MySQL tables:

| Table | Purpose |
|-------|---------|
| `categories` | Product categories (Footwear, Electronics, etc.) |
| `products` | Product catalog with prices, images, ratings |
| `users` | User accounts (phone/Google login) |
| `sessions` | Authentication tokens |
| `cart_items` | Shopping cart contents (per session) |
| `orders` | Order records with status tracking |
| `order_items` | Individual items in each order |
| `contacts` | Contact form submissions |

### Session Management

- Sessions identified by `x-session-token` header
- Guest carts supported (no login required)
- Tokens stored in browser localStorage
- Server validates tokens against `sessions` table

### Offline Fallback

Frontend detects API availability:
- **API reachable:** Cart syncs with MySQL database
- **API unreachable:** Cart falls back to localStorage
- **Dual-write:** Updates both database and localStorage when online

---

## API Endpoints

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

**Authentication:** Include `x-session-token` header with requests requiring authentication.

---

## Development

### Prerequisites

- Node.js v16 or higher
- MySQL 5.7+ or 8.0+
- Git

### Setup

See [procedure.md](procedure.md) for complete step-by-step setup instructions.

**Quick version:**

```bash
# Clone repository
git clone https://github.com/hamzasaleem22/E-Commerce-Webiste.git
cd E-Commerce-Webiste

# Set up MySQL database
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql

# Configure environment variables
# Edit server/.env with your MySQL credentials

# Install dependencies
npm install

# Start server
npm start
```

Server runs at `http://localhost:3000`

### Environment Variables

Create `server/.env` with:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=[YOUR_MYSQL_PASSWORD]
DB_NAME=hs_store
PORT=3000
```

**Security:** Never commit `.env` files. Already in `.gitignore`.

### Commands

```bash
npm start       # Start server (production)
npm run dev     # Start with auto-restart (development)
```

---

## Database Management

### View Data

```bash
mysql -u root -p hs_store
```

```sql
-- Check products
SELECT * FROM products;

-- Check cart items
SELECT * FROM cart_items;

-- Check orders
SELECT * FROM orders;
```

### Reset Database

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS hs_store;"
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql
```

### Backup Database

```bash
mysqldump -u root -p hs_store > backup.sql
```

---

## Screenshots

| Page | Description |
|------|-------------|
| Home | Hero section with 18-product grid and add-to-cart |
| Cart | Live order summary with quantity controls and checkout |
| About | Company information and mission |
| Contact | Contact form with database submission |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -m "feat: add new feature"`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Open a Pull Request

---

## Developers

| Name | Email |
|------|-------|
| Hamza Saleem | hamzasaleem22@gmail.com |
| Shuja ul Hassan | shujaulhassan@gmail.com |

**Contact:** 0303-5070436

---

## License

&copy; 2024 H&S E-Commerce. All rights reserved.
