# 🛒 Shopping Cart - Simple Guide

## 📁 Files You Have:
1. **index.html** - Home page with products
2. **cart.html** - Shopping cart page with bill

## 🎯 How It Works:

### **On Home Page (index.html):**

When you click "Add to Cart" button:
1. JavaScript gets the cart from browser memory
2. Checks if product already exists
3. If yes → adds 1 to quantity
4. If no → adds new product
5. Saves cart back to memory
6. Updates the number on cart icon
7. Shows "Product added!" message

### **On Cart Page (cart.html):**

When you open cart page:
1. JavaScript gets cart from browser memory
2. Shows each product with image, name, price
3. Calculates:
   - **Subtotal** = sum of all products
   - **Discount** = 20% off
   - **Total** = Subtotal - Discount
4. You can:
   - Click **+** to add more
   - Click **-** to reduce
   - Click **Remove** to delete item
   - Click **Clear Cart** to empty everything

## 💾 Where is Data Stored?

Data is stored in **localStorage** (browser memory):
- Stays even after you close browser
- Only you can see it (on your computer)
- Gets deleted if you clear browser data

## 🔧 JavaScript Functions:

### In index.html:
- `addToCart(name, price, image)` - Adds product
- `updateCount()` - Updates cart number

### In cart.html:
- `showCart()` - Shows all items and bill
- `changeQty(index, change)` - Changes quantity
- `removeItem(index)` - Removes item
- `clearCart()` - Empties cart
- `checkout()` - Checkout (coming soon)

## 📝 Simple Code Explanation:

```javascript
// Get cart from memory
var cartText = localStorage.getItem('cart');
var cart = [];
if (cartText) {
    cart = JSON.parse(cartText);
}

// Loop through cart
var i = 0;
while (i < cart.length) {
    // Do something with cart[i]
    i = i + 1;
}

// Save cart to memory
localStorage.setItem('cart', JSON.stringify(cart));
```

## ✅ What You Can Do:

1. ✅ Add products to cart
2. ✅ See cart count update
3. ✅ View all items in cart
4. ✅ Change quantity (+/-)
5. ✅ Remove items
6. ✅ See bill with discount
7. ✅ Clear entire cart

## 🎓 For Beginners:

- **localStorage** = Browser's memory
- **JSON.parse()** = Convert text to list
- **JSON.stringify()** = Convert list to text
- **while loop** = Repeat until condition is false
- **i = i + 1** = Go to next item

---

**Made by: Hamza Saleem & Shuja ul Hassan**
