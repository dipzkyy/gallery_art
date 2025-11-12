// Product Data
const products = [
    {
        id: 1,
        title: "Anak Alam Anak Malam",
        artist: "Arwin Hidayat",
        price: "Rp 8.500.000",
        image: "https://i0.wp.com/lukisan.art/wp-content/uploads/2019/02/Gallery-Lukisan-Arwin-Hidayat-Anak-Alam-Anak-Malam-2018-batik-115x195cm-1.jpg?fit=891%2C1440&ssl=1",
        category: "abstract"
    },
    {
        id: 2,
        title: "Contemplation",
        artist: "Modern Master",
        price: "Rp 6.200.000",
        image: "https://cdn.pixabay.com/photo/2020/06/06/04/09/man-5265170_1280.jpg",
        category: "portrait"
    },
    {
        id: 3,
        title: "Wild Spirit",
        artist: "Nature Artist",
        price: "Rp 7.800.000",
        image: "https://cdn.pixabay.com/photo/2022/04/24/16/52/animal-7154059_1280.jpg",
        category: "nature"
    },
    {
        id: 4,
        title: "Azure Dreams",
        artist: "Marine Painter",
        price: "Rp 5.500.000",
        image: "https://cdn.pixabay.com/photo/2022/03/30/13/16/betta-7101167_1280.jpg",
        category: "nature"
    },
    {
        id: 5,
        title: "Creative Hands",
        artist: "Abstract Artist",
        price: "Rp 4.900.000",
        image: "https://cdn.pixabay.com/photo/2021/01/01/16/06/hand-5879027_1280.jpg",
        category: "abstract"
    },
    {
        id: 6,
        title: "Serene Lake",
        artist: "Landscape Master",
        price: "Rp 9.200.000",
        image: "https://cdn.pixabay.com/photo/2022/02/22/03/30/lake-7027943_1280.jpg",
        category: "landscape"
    },
    {
        id: 7,
        title: "Urban Geometry",
        artist: "City Painter",
        price: "Rp 6.800.000",
        image: "https://i.pinimg.com/1200x/89/78/6a/89786ab9e6404fa53095159f1a2490ea.jpg",
        category: "modern"
    },
    {
        id: 8,
        title: "Be Robust",
        artist: "Contemporary Artist",
        price: "Rp 7.500.000",
        image: "https://theartspread.org/wp-content/uploads/2025/07/Be-Robust-thumb.jpg",
        category: "modern"
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (nav) {
                nav.classList.toggle('active');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Image Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Load Featured Products
    loadFeaturedProducts();
    
    // Fade-in Animation on Scroll
    initializeFadeAnimation();
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show loading state
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.innerHTML = '<div class="loading"></div>';
            
            // Simulate API call
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Add to Cart Functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const productId = e.target.closest('.add-to-cart').dataset.id;
            addToCart(productId);
        }
    });
    
    // Initialize cart count on page load
    updateCartCount();
});

// Load Featured Products
function loadFeaturedProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Add products to grid (first 8 products)
    const featuredProducts = products.slice(0, 8);
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        
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
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners for product actions
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            viewProductDetails(productId);
        });
    });
    
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            addToWishlist(productId);
        });
    });
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    
    if (!product) return;
    
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            artist: product.artist,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    showNotification(`${product.title} added to cart!`);
    
    // Update cart count in header if exists
    updateCartCount();
}

// Add to Wishlist Function
function addToWishlist(productId) {
    const product = products.find(p => p.id == productId);
    
    if (!product) return;
    
    // Get existing wishlist from localStorage or initialize empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already in wishlist
    const existingItem = wishlist.find(item => item.id == productId);
    
    if (!existingItem) {
        wishlist.push({
            id: product.id,
            title: product.title,
            artist: product.artist,
            price: product.price,
            image: product.image
        });
        
        // Save updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Show notification
        showNotification(`${product.title} added to wishlist!`);
    } else {
        showNotification(`${product.title} is already in your wishlist!`);
    }
}

// View Product Details
function viewProductDetails(productId) {
    // In a real application, this would navigate to a product detail page
    // For now, we'll just show an alert
    const product = products.find(p => p.id == productId);
    
    if (product) {
        alert(`Viewing details for: ${product.title} by ${product.artist}\nPrice: ${product.price}\nCategory: ${product.category}`);
        // In a real app: window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Animate out and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update Cart Count in Header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Find cart icon in header and update count
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (!cartIcon) return;
    
    const cartLink = cartIcon.closest('a');
    
    // Remove existing count if present
    const existingCount = cartLink.querySelector('.cart-count');
    if (existingCount) {
        existingCount.remove();
    }
    
    // Add count if there are items in cart
    if (cartCount > 0) {
        const countElement = document.createElement('span');
        countElement.className = 'cart-count';
        countElement.textContent = cartCount;
        
        cartLink.style.position = 'relative';
        cartLink.appendChild(countElement);
    }
}

// Fade-in Animation
function initializeFadeAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
}