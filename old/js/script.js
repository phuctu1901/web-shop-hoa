// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.btn-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.querySelector('.back-to-top');
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeBackToTop();
    initializeProductFilter();
    initializeContactMethods();
    initializeSmoothScroll();
    initializeAnimations();
    
    // Fix initial layout
    setTimeout(() => {
        fixProductGridLayout();
    }, 100);
});

// Fix product grid layout
function fixProductGridLayout() {
    const productGrid = document.querySelector('.products-grid');
    if (!productGrid) return;
    
    const visibleCards = Array.from(productCards).filter(card => {
        const computedStyle = window.getComputedStyle(card);
        return computedStyle.display !== 'none' && 
               card.style.display !== 'none' && 
               computedStyle.opacity !== '0';
    });
    
    // Apply appropriate layout class
    productGrid.classList.toggle('single-product', visibleCards.length === 1);
    productGrid.setAttribute('data-count', visibleCards.length);
    
    // Update count display
    updateProductCount(visibleCards.length);
}

// Navbar functionality
function initializeNavbar() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Back to top functionality
function initializeBackToTop() {
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Product filter functionality
function initializeProductFilter() {
    if (!categoryBtns.length) return;

    // Initialize product count on page load
    const initialVisibleCards = Array.from(productCards).filter(card => 
        card.style.display !== 'none' && 
        window.getComputedStyle(card).display !== 'none'
    );
    updateProductCount(initialVisibleCards.length);

    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function filterProducts(category) {
    const visibleCards = [];
    const hiddenCards = [];

    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            visibleCards.push(card);
        } else {
            hiddenCards.push(card);
        }
    });

    // Hide cards with animation
    hiddenCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }, index * 30);
    });

    // Show cards with animation after hiding is complete
    setTimeout(() => {
        visibleCards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Force consistent card dimensions
            card.style.width = '350px';
            card.style.minWidth = '350px';
            card.style.maxWidth = '350px';
            card.style.flex = '0 0 350px';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.5s ease';
            }, index * 80 + 100);
        });
        
        // Update product count and force layout fix
        setTimeout(() => {
            updateProductCount(visibleCards.length);
            fixProductGridLayout();
        }, 200);
    }, Math.max(hiddenCards.length * 30, 100));
}

function sortProducts(sortType) {
    const container = document.querySelector('.products-grid');
    const cards = Array.from(productCards).filter(card => 
        card.style.display !== 'none' && 
        window.getComputedStyle(card).display !== 'none'
    );

    cards.sort((a, b) => {
        switch (sortType) {
            case 'price-low':
                return getPrice(a) - getPrice(b);
            case 'price-high':
                return getPrice(b) - getPrice(a);
            case 'newest':
                return getProductDate(b) - getProductDate(a);
            case 'rating':
                return getRating(b) - getRating(a);
            default:
                return 0;
        }
    });

    // Animate out
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95) translateY(20px)';
        }, index * 50);
    });

    // Rearrange and animate in
    setTimeout(() => {
        cards.forEach((card, index) => {
            container.appendChild(card);
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
                card.style.transition = 'all 0.4s ease';
            }, index * 100);
        });
    }, cards.length * 50 + 200);
}

function getPrice(card) {
    const priceElement = card.querySelector('.price-current');
    const priceText = priceElement ? priceElement.textContent : '0';
    return parseInt(priceText.replace(/[^\d]/g, '')) || 0;
}

function getProductDate(card) {
    // For demo purposes, return random dates
    // In real implementation, this would come from data attributes
    return Math.random();
}

function getRating(card) {
    const stars = card.querySelectorAll('.product-rating .fas.fa-star');
    return stars ? stars.length : 0;
}

function updateProductCount(count) {
    const countElement = document.querySelector('.products-count');
    const gridElement = document.querySelector('.products-grid');
    
    if (countElement) {
        const total = productCards.length;
        countElement.textContent = `Hiển thị ${count} trong số ${total} sản phẩm`;
    }
    
    // Force layout recalculation
    if (gridElement) {
        gridElement.style.display = 'none';
        gridElement.offsetHeight; // Trigger reflow
        gridElement.style.display = 'grid';
    }
}

// Fix product grid layout
function fixProductGridLayout() {
    const productGrid = document.querySelector('.products-grid');
    if (!productGrid) return;
    
    const visibleCards = Array.from(productCards).filter(card => {
        const computedStyle = window.getComputedStyle(card);
        return computedStyle.display !== 'none' && 
               card.style.display !== 'none' && 
               computedStyle.opacity !== '0';
    });
    
    // Force consistent layout
    visibleCards.forEach(card => {
        card.style.width = '350px';
        card.style.minWidth = '350px';
        card.style.maxWidth = '350px';
        card.style.flex = '0 0 350px';
    });
    
    // Update count display
    updateProductCount(visibleCards.length);
}
    
    // Add class for single product layout
    if (gridElement) {
        gridElement.classList.toggle('single-product', count === 1);
        gridElement.setAttribute('data-count', count);
    }
}

// Contact methods functionality
function initializeContactMethods() {
    // Contact method click tracking
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-contact') || e.target.closest('.btn-contact')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard ? productCard.querySelector('.product-name').textContent : 'Sản phẩm';
            
            // Show contact options modal
            showContactModal(productName);
        }
        
        if (e.target.closest('.contact-method')) {
            const method = e.target.closest('.contact-method');
            const methodName = method.querySelector('.method-name').textContent;
            
            // Track contact method usage
            trackContactMethod(methodName);
        }
    });
}

function showContactModal(productName) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <h3>Liên hệ đặt hàng: ${productName}</h3>
                <p>Chọn phương thức liên hệ phù hợp:</p>
                <div class="contact-methods">
                    <a href="https://zalo.me/bloomstore" class="contact-method zalo">
                        <i class="fas fa-comments"></i>
                        <div class="method-info">
                            <span class="method-name">Zalo</span>
                            <span class="method-detail">Chat ngay</span>
                        </div>
                    </a>
                    <a href="https://facebook.com/bloomstore" class="contact-method facebook">
                        <i class="fab fa-facebook"></i>
                        <div class="method-info">
                            <span class="method-name">Facebook</span>
                            <span class="method-detail">Nhắn tin</span>
                        </div>
                    </a>
                    <a href="https://instagram.com/bloomstore" class="contact-method instagram">
                        <i class="fab fa-instagram"></i>
                        <div class="method-info">
                            <span class="method-name">Instagram</span>
                            <span class="method-detail">DM Instagram</span>
                        </div>
                    </a>
                    <a href="tel:+84901234567" class="contact-method phone">
                        <i class="fas fa-phone"></i>
                        <div class="method-info">
                            <span class="method-name">Điện thoại</span>
                            <span class="method-detail">+84 901 234 567</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

function trackContactMethod(methodName) {
    // Track contact method usage for analytics
    console.log(`Contact method used: ${methodName}`);
}



// Smooth scroll
function initializeSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll([
        '.section-header',
        '.product-card',
        '.service-card',
        '.testimonial-card',
        '.about-text',
        '.about-image'
    ].join(','));

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ECDC4' : '#8B4513'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function showLoading(button) {
    if (!button) return;
    
    button.disabled = true;
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Đang gửi...
    `;
}

function hideLoading(button, originalText = 'Gửi tin nhắn') {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = originalText;
}

// Hero stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateStat();
    });
}

// Initialize stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Product quick view functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-quick-view')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productImage = productCard.querySelector('img').src;
        const productPrice = productCard.querySelector('.price-current').textContent;
        const productDescription = productCard.querySelector('.product-description').textContent;

        showQuickView({
            name: productName,
            image: productImage,
            price: productPrice,
            description: productDescription
        });
    }
});

function showQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="modal-price">${product.price}</div>
                    <div class="modal-actions">
                        <button class="btn btn-primary btn-contact">
                            <i class="fas fa-phone"></i>
                            Liên hệ đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;

    // Add CSS for modal components
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
        }
        .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow: auto;
            animation: modalSlideIn 0.3s ease;
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            color: #666;
        }
        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }
        .modal-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
        }
        .modal-info h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }
        .modal-info p {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        .modal-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #8B4513;
            margin-bottom: 2rem;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
        }
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
                padding: 1.5rem;
            }
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
                modalStyles.parentNode.removeChild(modalStyles);
            }
        }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal is closed
    setTimeout(() => {
        modal.addEventListener('transitionend', () => {
            document.body.style.overflow = '';
        });
    }, 300);
}