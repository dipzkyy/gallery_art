// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.getElementById('credit-card-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
    
    // Mobile menu functionality (from script.js)
    initializeMobileMenu();
});

// Load order summary from cart
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.querySelector('.order-items');
    
    if (!orderItems) return;
    
    // Clear existing items
    orderItems.innerHTML = '';
    
    let subtotal = 0;
    
    // Add each cart item to order summary
    cart.forEach(item => {
        const priceNumber = parseFloat(item.price.replace('Rp ', '').replace(/\./g, ''));
        const itemTotal = priceNumber * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-info">
                <div class="order-item-image" style="background-image: url('${item.image}')"></div>
                <div class="order-item-details">
                    <h4>${item.title}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
            </div>
            <div class="order-item-price">
                ${formatPrice(itemTotal)}
            </div>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Calculate totals
    const shipping = subtotal > 0 ? 50000 : 0; // Rp 50,000 shipping
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    // Update order totals
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderShipping = document.getElementById('order-shipping');
    const orderTax = document.getElementById('order-tax');
    const orderTotal = document.getElementById('order-total');
    
    if (orderSubtotal) orderSubtotal.textContent = formatPrice(subtotal);
    if (orderShipping) orderShipping.textContent = formatPrice(shipping);
    if (orderTax) orderTax.textContent = formatPrice(tax);
    if (orderTotal) orderTotal.textContent = formatPrice(total);
}

// Process order
function processOrder() {
    const submitButton = document.querySelector('.submit-order');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<div class="loading"></div> Processing...';
    submitButton.disabled = true;
    
    // Validate form
    if (!validateCheckoutForm()) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showNotification('Order placed successfully! Thank you for your purchase.');
        
        // Redirect to home page after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// Validate checkout form
function validateCheckoutForm() {
    const requiredFields = document.querySelectorAll('#checkout-form [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
            
            // Remove error style after focus
            field.addEventListener('focus', function() {
                this.style.borderColor = '';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.');
    }
    
    return isValid;
}

// Format price to Indonesian Rupiah format
function formatPrice(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}