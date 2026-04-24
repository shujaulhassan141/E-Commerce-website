// ========================================
// BASIC SHOPPING CART JAVASCRIPT
// Uses simple loops and basic logic
// ========================================

// 1. HELPER FUNCTIONS
function getCart() {
    var cartText = localStorage.getItem('cart');
    if (cartText) {
        return JSON.parse(cartText);
    } else {
        return [];
    }
}

function saveCart(cart) {
    var cartText = JSON.stringify(cart);
    localStorage.setItem('cart', cartText);
    updateCount();
}

// ========================================
// 2. MAIN FUNCTIONS
// ========================================

// Add Product to Cart
function addToCart(name, price, image) {
    var cart = getCart();
    var found = false;

    // Basic Loop to check if item exists
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
            break;
        }
    }

    // If not found, add new item
    if (found === false) {
        var newItem = {
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        };
        cart.push(newItem);
    }

    saveCart(cart);
    alert('Product added to cart!');
}

// Update the Cart Count number in navbar
function updateCount() {
    var cart = getCart();
    var total = 0;

    // Basic Loop to count total items
    for (var i = 0; i < cart.length; i++) {
        total = total + cart[i].quantity;
    }

    // Update the HTML elements
    var cartIcons = document.querySelectorAll('.cart-count');
    for (var j = 0; j < cartIcons.length; j++) {
        cartIcons[j].textContent = total;
    }

    var cartCountId = document.getElementById('cartCount');
    if (cartCountId) {
        cartCountId.textContent = total;
    }
}

// Show Cart Items on the cart page
function showCart() {
    var itemsBox = document.getElementById('cart-items');

    // Safety check: if we are not on cart page, stop
    if (!itemsBox) {
        return;
    }

    var cart = getCart();
    updateCount();

    // If cart is empty
    if (cart.length === 0) {
        itemsBox.innerHTML = '<p style="text-align: center; padding: 2rem; color: #888;">Your cart is empty</p>';
        updateSummary(0);
        return;
    }

    // Clear current items
    itemsBox.innerHTML = '';

    // Loop through cart items and build HTML
    var subtotal = 0;

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        subtotal = subtotal + itemTotal;

        // Create HTML string
        var html = '<div class="cart-item">';
        html += '<img src="' + item.image + '" class="cart-item-image">';
        html += '<div class="cart-item-details">';
        html += '<h3>' + item.name + '</h3>';
        html += '<p class="cart-item-price">$' + item.price.toFixed(2) + '</p>';
        html += '</div>';
        html += '<div class="cart-item-quantity">';
        html += '<button class="qty-btn" onclick="changeQty(' + i + ', -1)">-</button>';
        html += '<span>' + item.quantity + '</span>';
        html += '<button class="qty-btn" onclick="changeQty(' + i + ', 1)">+</button>';
        html += '</div>';
        html += '<div class="cart-item-total">';
        html += '<p>$' + itemTotal.toFixed(2) + '</p>';
        html += '<button class="remove-btn" onclick="removeItem(' + i + ')">Remove</button>';
        html += '</div>';
        html += '</div>';

        // Add to the box
        itemsBox.innerHTML += html;
    }

    updateSummary(subtotal);
}

// Update the Summary Box (Total, Discount)
function updateSummary(subtotal) {
    var discount = subtotal * 0.20; // 20% discount
    var total = subtotal - discount;

    var subtotalEl = document.getElementById('subtotal');
    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);

    var discountEl = document.getElementById('discount');
    if (discountEl) discountEl.textContent = '$' + discount.toFixed(2);

    var totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}

// Change Quantity (+ or -)
function changeQty(index, change) {
    var cart = getCart();

    if (cart[index]) {
        cart[index].quantity = cart[index].quantity + change;

        // If quantity is 0 or less, remove the item
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart(cart);
        showCart();
    }
}

// Remove Item completely
function removeItem(index) {
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    showCart();
}

// Clear entire cart
function clearCart() {
    var sure = confirm('Clear all items?');
    if (sure) {
        localStorage.removeItem('cart');
        showCart();
    }
}

// Checkout Button (Placeholder)
function checkout() {
    alert('Checkout coming soon!');
}

// ========================================
// 3. LOGIN FUNCTIONS (Simple)
// ========================================

function googleLogin() {
    setLoginState(true);
    alert('Logged in with Google successfully!');
}

function loginWithPhone() {
    var phoneInput = document.getElementById('phoneInput');
    var phone = phoneInput.value;

    // Check availability of phone number (Simple regex for digits)
    var isNumber = /^\d+$/.test(phone);

    if (phone.length === 11 && isNumber) {
        setLoginState(true);
        alert('Logged in successfully with ' + phone);
    } else {
        alert('Please enter a valid 11-digit phone number!');
    }
}

function verifyOTP() {
    // Not used anymore, simpler flow
    console.log("OTP Verification removed");
}

function setLoginState(isLoggedIn) {
    var loginToggle = document.getElementById('login-toggle');
    var loggedInToggle = document.getElementById('logged-in-toggle');

    if (loginToggle) {
        loginToggle.checked = !isLoggedIn; // Uncheck login modal
    }
    if (loggedInToggle) {
        loggedInToggle.checked = isLoggedIn; // Check logged in state
    }
}

// ========================================
// 4. RUN ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    updateCount();
    showCart();
});
