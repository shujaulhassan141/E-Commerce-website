-- ============================================================
-- H&S Online Store — MySQL Database Schema
-- Database: hs_store
-- Run: mysql -u root -p < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS hs_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hs_store;

-- ── Categories ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  slug      VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Products ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id    INT UNSIGNED,
  name           VARCHAR(200) NOT NULL,
  price          DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  image_url      TEXT NOT NULL,
  rating         TINYINT UNSIGNED DEFAULT 5 COMMENT '1-5 stars',
  badge          VARCHAR(50) DEFAULT 'RARE',
  stock          INT UNSIGNED DEFAULT 100,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ── Users ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  phone       VARCHAR(20) UNIQUE,
  email       VARCHAR(200) UNIQUE,
  google_id   VARCHAR(200) UNIQUE,
  name        VARCHAR(200),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login  DATETIME
);

-- ── Sessions ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED,
  token      VARCHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Cart Items (server-side persistent cart) ─────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(64) NOT NULL,
  product_id   INT UNSIGNED NOT NULL,
  quantity     INT UNSIGNED NOT NULL DEFAULT 1,
  added_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cart_item (session_token, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ── Orders ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED,
  session_token VARCHAR(64),
  subtotal     DECIMAL(10,2) NOT NULL,
  discount     DECIMAL(10,2) NOT NULL DEFAULT 0,
  total        DECIMAL(10,2) NOT NULL,
  status       ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ── Order Items ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED,
  name       VARCHAR(200) NOT NULL,
  price      DECIMAL(10,2) NOT NULL,
  quantity   INT UNSIGNED NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- ── Contact Messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100),
  email      VARCHAR(200) NOT NULL,
  phone      VARCHAR(20),
  subject    VARCHAR(100),
  message    TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
