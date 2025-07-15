// Heritage Fusion Catering - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Smooth Scrolling for Navigation Links
    initSmoothScrolling();
    
    // Contact Form Handling
    initContactForm();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Navbar Background on Scroll
    initNavbarScroll();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('wedding-inquiry-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        form.classList.add('loading');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
            
            // Log form data (for development - remove in production)
            console.log('Form submitted with data:', data);
            
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    const requiredFields = [
        'partner1-name',
        'partner1-culture', 
        'partner2-name',
        'partner2-culture',
        'email',
        'message'
    ];
    
    let isValid = true;
    const errors = [];
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
            errors.push(`${field.replace('-', ' ')} is required`);
            highlightErrorField(field);
        }
    });
    
    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        isValid = false;
        errors.push('Please enter a valid email address');
        highlightErrorField('email');
    }
    
    // Show errors if any
    if (!isValid) {
        showFormErrors(errors);
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Highlight error fields
function highlightErrorField(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#dc3545';
        field.addEventListener('input', function() {
            this.style.borderColor = '';
        }, { once: true });
    }
}

// Show form errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid #f5c6cb;
    `;
    
    errorDiv.innerHTML = `
        <strong>Please fix the following errors:</strong>
        <ul style="margin: 0.5rem 0 0 1rem;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    // Insert error message at the top of the form
    const form = document.getElementById('wedding-inquiry-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show success message
function showSuccessMessage() {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `
        <strong>Thank you for your inquiry!</strong><br>
        We'll respond within 24 hours to schedule your complimentary cultural consultation.
    `;
    
    // Insert success message
    const form = document.getElementById('wedding-inquiry-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .culture-card, .value, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Utility Functions

// Debounce function for performance optimization
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

// Format phone number (optional enhancement)
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phoneNumber;
}

// Auto-format phone number input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const value = e.target.value;
            const formattedValue = formatPhoneNumber(value);
            
            if (formattedValue !== value) {
                e.target.value = formattedValue;
            }
        });
    }
});

// Cultural insights data (for potential future enhancements)
const culturalCombinations = {
    'nigerian-arab': {
        dishes: ['Jollof Rice', 'Suya', 'Mansaf', 'Knafeh'],
        traditions: ['Henna ceremony', 'Traditional drumming'],
        considerations: ['Halal requirements', 'Spice preferences']
    },
    'british-indian': {
        dishes: ['Traditional Roast', 'Fish & Chips', 'Biryani', 'Curry'],
        traditions: ['Tea ceremony', 'Mehndi ceremony'],
        considerations: ['Vegetarian options', 'Spice levels']
    }
    // Add more combinations as needed
};

// Analytics tracking (placeholder for actual implementation)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    // Replace with actual analytics implementation (GA4, etc.)
    console.log('Event tracked:', eventName, eventData);
}

// Track form interactions
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wedding-inquiry-form');
    
    if (form) {
        // Track form start
        form.addEventListener('focusin', function() {
            trackEvent('form_start');
        }, { once: true });
        
        // Track form submission
        form.addEventListener('submit', function() {
            trackEvent('form_submit', {
                partner1_culture: form['partner1-culture'].value,
                partner2_culture: form['partner2-culture'].value
            });
        });
    }
    
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                section: this.getAttribute('href')
            });
        });
    });
    
    // Track CTA clicks
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim()
            });
        });
    });
});
