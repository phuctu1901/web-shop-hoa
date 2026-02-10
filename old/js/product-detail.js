// Product Detail Page JavaScript

// Image gallery arrays
const productImages = [
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594736797933-d0282ba6205c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1595255778816-b5e0efeddc7d?w=600&h=600&fit=crop'
];

let currentImageIndex = 0;

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    initializeProductTabs();
    initializeProductOptions();
    initializeImageGallery();
    initializeProductActions();
});

// Product tabs functionality
function initializeProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Product options functionality
function initializeProductOptions() {
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Update price based on size
            updatePriceBasedOnSize(this.textContent);
        });
    });

    // Addon options
    const addonCheckboxes = document.querySelectorAll('.addon-item input[type="checkbox"]');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updatePriceBasedOnAddons();
        });
    });
}

// Image gallery functionality
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentImageIndex = index;
            changeMainImage(productImages[index]);
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Change main image
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.style.opacity = '0.5';
    
    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '1';
    }, 150);
}

// Open image modal
function openImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = productImages[currentImageIndex];
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Previous image in modal
function previousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
    document.getElementById('modalImage').src = productImages[currentImageIndex];
    
    // Update main gallery
    changeMainImage(productImages[currentImageIndex]);
    updateActiveThumbnail();
}

// Next image in modal
function nextImage() {
    currentImageIndex = currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0;
    document.getElementById('modalImage').src = productImages[currentImageIndex];
    
    // Update main gallery
    changeMainImage(productImages[currentImageIndex]);
    updateActiveThumbnail();
}

// Update active thumbnail
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Product actions
function initializeProductActions() {
    // Contact buttons tracking
    const contactBtns = document.querySelectorAll('.contact-buttons .btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const method = this.href.includes('zalo') ? 'Zalo' : 
                         this.href.includes('tel') ? 'Phone' : 'Unknown';
            
            // Track contact method usage
            trackContactMethod(method);
            
            // Show confirmation
            const productName = document.querySelector('.product-title').textContent;
            showContactConfirmation(method, productName);
        });
    });
}

// Update price based on size
function updatePriceBasedOnSize(size) {
    const currentPriceEl = document.querySelector('.current-price');
    const originalPriceEl = document.querySelector('.original-price');
    
    let basePrice = 1200000;
    let originalPrice = 1500000;
    
    switch(size) {
        case 'Nhỏ':
            basePrice = 900000;
            originalPrice = 1100000;
            break;
        case 'Lớn':
            basePrice = 1500000;
            originalPrice = 1800000;
            break;
        default: // Vừa
            basePrice = 1200000;
            originalPrice = 1500000;
    }
    
    // Update prices with addon costs
    const finalPrice = calculateFinalPrice(basePrice);
    const finalOriginalPrice = calculateFinalPrice(originalPrice);
    
    currentPriceEl.textContent = formatPrice(finalPrice);
    originalPriceEl.textContent = formatPrice(finalOriginalPrice);
}

// Update price based on addons
function updatePriceBasedOnAddons() {
    const activeSize = document.querySelector('.size-option.active').textContent;
    updatePriceBasedOnSize(activeSize);
}

// Calculate final price with addons
function calculateFinalPrice(basePrice) {
    const addonCheckboxes = document.querySelectorAll('.addon-item input[type="checkbox"]:checked');
    let addonCost = 0;
    
    addonCheckboxes.forEach(checkbox => {
        const value = checkbox.value;
        switch(value) {
            case 'ribbon':
                addonCost += 50000;
                break;
            case 'card':
                addonCost += 30000;
                break;
            case 'box':
                addonCost += 100000;
                break;
        }
    });
    
    return basePrice + addonCost;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Show contact confirmation
function showContactConfirmation(method, productName) {
    const message = `Bạn đang liên hệ qua ${method} cho sản phẩm: ${productName}`;
    showNotification(message, 'info');
}

// Track contact method
function trackContactMethod(method) {
    // Analytics tracking
    console.log(`Contact method used: ${method} for product detail page`);
    
    // Could send to analytics service
    if (window.gtag) {
        gtag('event', 'contact_method_used', {
            method: method,
            page: 'product_detail',
            product: 'romantic_bouquet'
        });
    }
}

// Notification function (reuse from main script)
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

// Keyboard navigation for image modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    
    if (modal.classList.contains('show')) {
        switch(e.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    }
});

// Smooth scroll to tabs when coming from external links
function scrollToTabs() {
    const tabsSection = document.querySelector('.product-tabs');
    if (tabsSection) {
        tabsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Initialize image preloading for better performance
function preloadImages() {
    productImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Handle window resize for responsive gallery
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate gallery dimensions if needed
        const mainImage = document.querySelector('.main-image img');
        if (mainImage && window.innerWidth <= 768) {
            // Mobile optimizations
            mainImage.style.height = '300px';
        } else if (mainImage) {
            // Desktop
            mainImage.style.height = '500px';
        }
    }, 250);
});