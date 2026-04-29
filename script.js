// Smooth scrolling and navigation effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const navigation = document.querySelector('.navigation');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navigation.style.background = 'rgba(255, 255, 255, 0.98)';
            navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.background = 'rgba(255, 255, 255, 0.95)';
            navigation.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Interactive Menu Functionality
    initInteractiveMenu();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.querySelector('.inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Show success message (in a real implementation, this would submit to a server)
                showNotification('Takk for din forespørsel! Vi kontakter deg snart.', 'success');
                this.reset();
            } else {
                showNotification('Vennligst fyll ut alle påkrevde felt.', 'error');
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.offering-item, .testimonial, .value-item, .team-member, .faq-item, .menu-selection-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Image placeholder hover effects
    const imagePlaceholders = document.querySelectorAll('[class*="image-placeholder"]');
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth hover effects for buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .menu-selection-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Interactive Menu System
function initInteractiveMenu() {
    const menuCards = document.querySelectorAll('.menu-selection-card');
    const menuDetailsSection = document.getElementById('menu-details');
    const backButton = document.getElementById('back-button');
    const menuSelectionSection = document.querySelector('.menu-selection-section');
    
    if (!menuCards.length || !menuDetailsSection) return;
    
    // Add click handlers to menu cards
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            const menuType = this.getAttribute('data-menu');
            showMenuDetails(menuType);
        });
        
        // Also handle button clicks
        const button = card.querySelector('.menu-selection-button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const menuType = card.getAttribute('data-menu');
                showMenuDetails(menuType);
            });
        }
    });
    
    // Back button handler
    if (backButton) {
        backButton.addEventListener('click', function() {
            hideMenuDetails();
        });
    }
    
    function showMenuDetails(menuType) {
        // Hide menu selection
        menuSelectionSection.style.display = 'none';
        
        // Show details section
        menuDetailsSection.style.display = 'block';
        
        // Hide all menu details
        const allDetails = document.querySelectorAll('.menu-detail-content');
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show selected menu details
        const selectedDetail = document.getElementById(menuType + '-details');
        if (selectedDetail) {
            selectedDetail.style.display = 'block';
        }
        
        // Smooth scroll to details
        menuDetailsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    function hideMenuDetails() {
        // Hide details section
        menuDetailsSection.style.display = 'none';
        
        // Show menu selection
        menuSelectionSection.style.display = 'block';
        
        // Smooth scroll back to selection
        menuSelectionSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#8b4513';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Lazy loading for future images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Smooth page transitions (for future enhancement)
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"]:not([href*="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                e.preventDefault();
                
                // Add fade out effect
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);