// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    
    // Checkout button event
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'gallery.html';
        });
    }
    
    // Empty cart continue shopping
    const emptyCartBtn = document.querySelector('.empty-cart-content .btn-primary');
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', function() {
            window.location.href = 'gallery.html';
        });
    }
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.querySelector('.cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContainer = document.querySelector('.cart-container');
    
    if (!cartItemsList || !emptyCartMessage || !cartContainer) return;
    
    if (cart.length === 0) {
        // Show empty cart message
        emptyCartMessage.style.display = 'block';
        cartContainer.style.display = 'none';
        return;
    }
    
    // Hide empty cart message
    emptyCartMessage.style.display = 'none';
    cartContainer.style.display = 'grid';
    
    // Clear existing items
    cartItemsList.innerHTML = '';
    
    let subtotal = 0;
    
    // Add each cart item
    cart.forEach(item => {
        const priceNumber = parseFloat(item.price.replace('Rp ', '').replace(/\./g, ''));
        const itemTotal = priceNumber * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>by ${item.artist}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">
                <p>${formatPrice(itemTotal)}</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsList.appendChild(cartItem);
    });
    
    // Calculate totals
    const shipping = subtotal > 0 ? 50000 : 0; // Rp 50,000 shipping
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    // Update summary
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (shippingElement) shippingElement.textContent = formatPrice(shipping);
    if (taxElement) taxElement.textContent = formatPrice(tax);
    if (totalElement) totalElement.textContent = formatPrice(total);
    
    // Add event listeners for quantity controls and remove buttons
    addCartEventListeners();
}

// Add event listeners for cart interactions
function addCartEventListeners() {
    // Quantity minus buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            updateCartQuantity(productId, -1);
        });
    });
    
    // Quantity plus buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            updateCartQuantity(productId, 1);
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            removeFromCart(productId);
        });
    });
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id == productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reload cart items
        loadCartItems();
        
        // Update cart count in header
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != productId);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart items
    loadCartItems();
    
    // Update cart count in header
    updateCartCount();
    
    // Show notification
    showNotification('Item removed from cart');
}

// Format price to Indonesian Rupiah format
function formatPrice(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}