// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initFloatingIcons();
    initServiceCards();
    initTestimonials();
    
    // Smooth scrolling for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.services').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe testimonials
    const testimonials = document.querySelectorAll('.testimonial-item');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.animationDelay = `${index * 0.2}s`;
        observer.observe(testimonial);
    });

    // Observe comparison table
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        observer.observe(comparisonTable);
    }
}

// Floating icons animation
function initFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            icon.style.transform = `translateY(${rate}px)`;
        });
        
        // Add random rotation
        setInterval(() => {
            const randomRotation = Math.random() * 360;
            icon.style.transform += ` rotate(${randomRotation}deg)`;
        }, 5000 + index * 1000);
    });
}

// Enhanced service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Hover effect with tilt
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) rotateX(0) rotateY(0)';
        });
        
        // Click animation
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
}

// Testimonials auto-rotation
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    
    // Add highlight class to first testimonial
    if (testimonials.length > 0) {
        testimonials[0].classList.add('highlighted');
    }
    
    // Rotate testimonials every 5 seconds
    setInterval(() => {
        testimonials[currentIndex].classList.remove('highlighted');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('highlighted');
    }, 5000);
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        let current = 0;
        const increment = numericTarget / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                stat.textContent = current.toFixed(1) + '%';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.services-hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .testimonial-item,
    .comparison-table {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in,
    .testimonial-item.animate-in,
    .comparison-table.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .testimonial-item.highlighted {
        transform: scale(1.02);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
        border: 2px solid var(--primary);
    }
`;
document.head.appendChild(style);