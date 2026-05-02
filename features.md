 Here are all the MySQL commands to verify data is saved in the database:                     
                                                       
  Step 1 — Connect to MySQL
                                                                                               
  mysql -u root -p<your_password> hs_store
                                                                                               
  ---             
  Step 2 — Check All Tables at Once                                                            
                                                                                               
  SHOW TABLES;
                                                                                               
  ---             
  Check Users (after login)

  SELECT * FROM users;

  ---                                                                                          
  Check Sessions (after login)
                                                                                               
  SELECT * FROM sessions;

  ---
  Check Products (should show 18)

  SELECT id, name, price FROM products;
  SELECT COUNT(*) FROM products;                                                               
                                
  ---                                                                                          
  Check Categories (should show 7)                                                             
   
  SELECT * FROM categories;                                                                    
                  
  ---
  Check Cart Items (after adding to cart)
                                                                                               
  SELECT * FROM cart_items;
                                                                                               
  ---             
  Check Orders (after checkout)

  SELECT * FROM orders;

  ---                                                                                          
  Check Order Items (items inside each order)
                                                                                               
  SELECT * FROM order_items;

  ---
  Check Orders + Items Together (joined)
                                                                                               
  SELECT o.id AS order_id, o.subtotal, o.discount, o.total, o.status,
         oi.name AS product_name, oi.price, oi.quantity                                        
  FROM orders o   
  JOIN order_items oi ON oi.order_id = o.id;                                                   
                                                                                               
  ---
  Check Contact Form Submissions                                                               
                  
  SELECT * FROM contacts;

  ---                                                                                          
  Check Everything at Once (row count summary)
                                                                                               
  SELECT 'users'       AS tbl, COUNT(*) AS rows FROM users
  UNION SELECT 'sessions',     COUNT(*) FROM sessions                                          
  UNION SELECT 'products',     COUNT(*) FROM products
  UNION SELECT 'categories',   COUNT(*) FROM categories                                        
  UNION SELECT 'cart_items',   COUNT(*) FROM cart_items
  UNION SELECT 'orders',       COUNT(*) FROM orders                                            
  UNION SELECT 'order_items',  COUNT(*) FROM order_items                                       
  UNION SELECT 'contacts',     COUNT(*) FROM contacts;
                                                                                               
  ---             
  Exit MySQL

  exit
                                                                                               
  ---
  Quick tip: After checkout, cart_items should show 0 rows (cart gets cleared), and orders +   
  order_items should show the new order. That confirms everything saved correctly.             
   