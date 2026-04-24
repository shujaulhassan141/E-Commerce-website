// ========================================
// H&S Store — Cart + API Integration
// Falls back to localStorage when server is offline
// ========================================

var API_BASE = 'http://localhost:3000/api';

// ── Session token (identifies guest cart) ──
function getSessionToken() {
    var token = localStorage.getItem('hs_session');
    if (!token) {
        token = 'guest_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('hs_session', token);
    }
    return token;
}

// ── API helper ─────────────────────────────
async function apiRequest(method, path, body) {
    try {
        var opts = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': getSessionToken()
            }
        };
        if (body) opts.body = JSON.stringify(body);
        var res = await fetch(API_BASE + path, opts);
        return await res.json();
    } catch (e) {
        return { success: false, error: 'Server offline', offline: true };
    }
}

// ── localStorage helpers (offline fallback) ──
function getLocalCart() {
    var text = localStorage.getItem('cart');
    return text ? JSON.parse(text) : [];
}

function saveLocalCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCount();
}

// ========================================
// MAIN FUNCTIONS
// ========================================

// Add to cart (online + offline fallback)
async function addToCart(name, price, image, productId) {
    var cart = getLocalCart();
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ name: name, price: Number(price), image: image, quantity: 1, product_id: productId || null });
    }
    saveLocalCart(cart);

    // Sync to server if productId provided
    if (productId) {
        await apiRequest('POST', '/cart', { product_id: productId, quantity: 1 });
    }

    alert('Product added to cart!');
}

// Update count badge
function updateCount() {
    var cart = getLocalCart();
    var total = 0;
    for (var i = 0; i < cart.length; i++) total += cart[i].quantity;

    var els = document.querySelectorAll('.cart-count, #cartCount');
    for (var j = 0; j < els.length; j++) els[j].textContent = total;
}

// Show cart page items
async function showCart() {
    var itemsBox = document.getElementById('cart-items');
    if (!itemsBox) return;

    // Try to sync from server
    var serverData = await apiRequest('GET', '/cart');
    if (serverData.success && serverData.items && serverData.items.length) {
        var merged = serverData.items.map(function(i) {
            return { name: i.name, price: Number(i.price), image: i.image_url, quantity: i.quantity, product_id: i.product_id };
        });
        saveLocalCart(merged);
    }

    var cart = getLocalCart();
    updateCount();

    // Clear container safely
    while (itemsBox.firstChild) itemsBox.removeChild(itemsBox.firstChild);

    if (!cart.length) {
        var emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'Your cart is empty';
        emptyMsg.style.cssText = 'text-align:center;padding:2rem;color:#888;';
        itemsBox.appendChild(emptyMsg);
        updateSummary(0);
        return;
    }

    var subtotal = 0;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        var row = document.createElement('div');
        row.className = 'cart-item';

        var img = document.createElement('img');
        img.src = item.image;
        img.alt = '';
        img.className = 'cart-item-image';

        var details = document.createElement('div');
        details.className = 'cart-item-details';
        var nameEl = document.createElement('h3');
        nameEl.textContent = item.name;
        var priceEl = document.createElement('p');
        priceEl.className = 'cart-item-price';
        priceEl.textContent = '$' + item.price.toFixed(2);
        details.appendChild(nameEl);
        details.appendChild(priceEl);

        var qtyDiv = document.createElement('div');
        qtyDiv.className = 'cart-item-quantity';
        var btnMinus = document.createElement('button');
        btnMinus.className = 'qty-btn';
        btnMinus.textContent = '-';
        btnMinus.setAttribute('onclick', 'changeQty(' + i + ', -1)');
        var qtySpan = document.createElement('span');
        qtySpan.textContent = item.quantity;
        var btnPlus = document.createElement('button');
        btnPlus.className = 'qty-btn';
        btnPlus.textContent = '+';
        btnPlus.setAttribute('onclick', 'changeQty(' + i + ', 1)');
        qtyDiv.appendChild(btnMinus);
        qtyDiv.appendChild(qtySpan);
        qtyDiv.appendChild(btnPlus);

        var totalDiv = document.createElement('div');
        totalDiv.className = 'cart-item-total';
        var totalP = document.createElement('p');
        totalP.textContent = '$' + itemTotal.toFixed(2);
        var removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('onclick', 'removeItem(' + i + ')');
        totalDiv.appendChild(totalP);
        totalDiv.appendChild(removeBtn);

        row.appendChild(img);
        row.appendChild(details);
        row.appendChild(qtyDiv);
        row.appendChild(totalDiv);
        fragment.appendChild(row);
    }

    itemsBox.appendChild(fragment);
    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    var discount = subtotal * 0.20;
    var total = subtotal - discount;

    var s = document.getElementById('subtotal');
    var d = document.getElementById('discount');
    var t = document.getElementById('total');
    if (s) s.textContent = '$' + subtotal.toFixed(2);
    if (d) d.textContent = '$' + discount.toFixed(2);
    if (t) t.textContent = '$' + total.toFixed(2);
}

async function changeQty(index, change) {
    var cart = getLocalCart();
    if (!cart[index]) return;

    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        var pid = cart[index].product_id;
        cart.splice(index, 1);
        if (pid) await apiRequest('DELETE', '/cart/' + pid);
    } else {
        var pid2 = cart[index].product_id;
        if (pid2) await apiRequest('PUT', '/cart/' + pid2, { quantity: cart[index].quantity });
    }

    saveLocalCart(cart);
    showCart();
}

async function removeItem(index) {
    var cart = getLocalCart();
    var pid = cart[index] ? cart[index].product_id : null;
    cart.splice(index, 1);
    saveLocalCart(cart);
    if (pid) await apiRequest('DELETE', '/cart/' + pid);
    showCart();
}

async function clearCart() {
    if (!confirm('Clear all items?')) return;
    localStorage.removeItem('cart');
    await apiRequest('DELETE', '/cart');
    showCart();
}

async function checkout() {
    var result = await apiRequest('POST', '/orders/checkout');
    if (result.success) {
        alert('Order placed! Order #' + result.order.id + '\nTotal: $' + result.order.total.toFixed(2));
        localStorage.removeItem('cart');
        showCart();
    } else if (result.offline) {
        alert('Checkout coming soon! (Server offline)');
    } else {
        alert('Checkout failed: ' + result.error);
    }
}

// ========================================
// LOGIN FUNCTIONS
// ========================================

async function googleLogin() {
    var fakeGoogleId = 'google_' + Date.now();
    var result = await apiRequest('POST', '/users/login/google', {
        google_id: fakeGoogleId,
        name: 'Google User',
        email: 'user@gmail.com'
    });
    if (result.success) {
        localStorage.setItem('hs_session', result.token);
    }
    setLoginState(true);
    alert('Logged in with Google successfully!');
}

async function loginWithPhone() {
    var phoneInput = document.getElementById('phoneInput');
    var phone = phoneInput ? phoneInput.value : '';
    var isNumber = /^\d+$/.test(phone);

    if (phone.length === 11 && isNumber) {
        var result = await apiRequest('POST', '/users/login/phone', { phone: phone });
        if (result.success) {
            localStorage.setItem('hs_session', result.token);
        }
        setLoginState(true);
        alert('Logged in successfully with ' + phone);
    } else {
        alert('Please enter a valid 11-digit phone number!');
    }
}

function setLoginState(isLoggedIn) {
    var loginToggle = document.getElementById('login-toggle');
    var loggedInToggle = document.getElementById('logged-in-toggle');
    if (loginToggle) loginToggle.checked = !isLoggedIn;
    if (loggedInToggle) loggedInToggle.checked = isLoggedIn;
}

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    updateCount();
    showCart();
});
