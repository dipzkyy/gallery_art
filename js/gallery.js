// Gallery-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load all products initially
    loadGalleryProducts();
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter products
            const filter = this.dataset.filter;
            filterProducts(filter);
        });
    });
    
    // Load More functionality
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // Check URL parameters for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        // Find and click the corresponding filter button
        const categoryButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (categoryButton) {
            categoryButton.click();
        }
    }
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Fade-in animation
    initializeFadeAnimation();
});

// Load Gallery Products
function loadGalleryProducts() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) return;
    
    // Clear existing content
    galleryGrid.innerHTML = '';
    
    // Add all products to grid
    products.forEach(product => {
        const productCard = createProductCard(product);
        galleryGrid.appendChild(productCard);
    });
    
    // Add event listeners to new product cards
    addProductEventListeners();
}

// Filter Products
function filterProducts(filter) {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) return;
    
    // Clear existing content
    galleryGrid.innerHTML = '';
    
    // Filter products
    let filteredProducts;
    
    if (filter === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    // Add filtered products to grid
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        galleryGrid.appendChild(productCard);
    });
    
    // Add event listeners to new product cards
    addProductEventListeners();
    
    // Show message if no products found
    if (filteredProducts.length === 0) {
        const noProductsMsg = document.createElement('div');
        noProductsMsg.className = 'no-products-message text-center';
        noProductsMsg.innerHTML = `
            <div style="padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 15px; color: var(--text-dark);">No artworks found</h3>
                <p style="color: var(--text-light); margin-bottom: 30px;">No artworks found in this category.</p>
                <a href="gallery.html" class="btn-primary">View All Artworks</a>
            </div>
        `;
        galleryGrid.appendChild(noProductsMsg);
    }
}

// Create Product Card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card fade-in';
    productCard.dataset.category = product.category;
    
    productCard.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}')">
            <div class="product-overlay">
                <div class="quick-actions">
                    <button class="quick-btn add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="quick-btn view-details" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="quick-btn add-to-wishlist" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-artist">by ${product.artist}</p>
            <p class="product-price">${product.price}</p>
        </div>
    `;
    
    return productCard;
}

// Add event listeners to product cards
function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            addToCart(productId);
        });
    });
    
    // View details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            viewProductDetails(productId);
        });
    });
    
    // Add to wishlist buttons
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            addToWishlist(productId);
        });
    });
}

// Load More Products (for pagination)
function loadMoreProducts() {
    // In a real application, this would fetch more products from an API
    // For this demo, we'll just show a message
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'All Artworks Loaded';
        loadMoreBtn.disabled = true;
        
        // Show notification
        showNotification('All available artworks are now displayed.');
    }
}