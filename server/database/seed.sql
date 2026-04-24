-- ============================================================
-- H&S Online Store — Seed Data
-- Run AFTER schema.sql:  mysql -u root -p < database/seed.sql
-- ============================================================

USE hs_store;

-- ── Categories ──────────────────────────────────────────────
INSERT IGNORE INTO categories (id, name, slug) VALUES
  (1, 'Footwear',    'footwear'),
  (2, 'Electronics', 'electronics'),
  (3, 'Accessories', 'accessories'),
  (4, 'Clothing',    'clothing'),
  (5, 'Audio',       'audio'),
  (6, 'Computers',   'computers'),
  (7, 'Gaming',      'gaming');

-- ── Products ────────────────────────────────────────────────
INSERT IGNORE INTO products
  (id, category_id, name, price, original_price, image_url, rating, badge)
VALUES
  (1,  1, 'Shoes Mirrels',          79.99,  99.99,
   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
   4, '20% OFF'),

  (2,  3, 'Smart Watch',           119.99, 149.99,
   'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (3,  1, 'Running Shoes',          63.99,  79.99,
   'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
   4, 'RARE'),

  (4,  2, 'Future VR Headset',     299.99, 399.99,
   'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (5,  2, 'Pro Camera Drone',      499.99, 649.99,
   'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (6,  3, 'Smart Vision Glasses',  199.99, 249.99,
   'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
   4, 'RARE'),

  (7,  4, 'Premium Formal Trousers', 79.99, 99.99,
   'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (8,  4, 'Classic Formal Shirt',   47.99,  59.99,
   'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (9,  4, 'Streetwear Baseball Cap', 23.99, 29.99,
   'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
   4, 'RARE'),

  (10, 2, 'Smart Speaker',          89.99, 112.49,
   'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (11, 1, 'Sport Shoes Pro',       159.99, 199.99,
   'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop',
   4, 'RARE'),

  (12, 6, 'Gaming Laptop',         279.99, 349.99,
   'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (13, 5, 'Premium Wireless Earbuds', 89.99, 112.49,
   'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (14, 5, 'AirPods',               399.99, 499.99,
   'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (15, 5, 'Headphones',            129.99, 162.49,
   'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (16, 7, 'RGB Gaming Keyboard',   149.99, 187.49,
   'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE'),

  (17, 6, 'MacBook Air',           569.99, 712.49,
   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
   4, 'RARE'),

  (18, 5, 'AirPods Pro',           349.99, 437.49,
   'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
   5, 'RARE');
