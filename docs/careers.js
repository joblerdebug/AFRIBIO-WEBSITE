// Navigation functionality - Optimized to match first file
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('navContainer');
    const navToggle = document.getElementById('navToggle');
    const navCollapse = document.getElementById('navCollapse');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const mainContent = document.getElementById('mainContent');
    
    // Toggle navigation collapsed/expanded state
    function toggleNav() {
        navContainer.classList.toggle('collapsed');
        const isExpanded = !navContainer.classList.contains('collapsed');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Update toggle icon
        const toggleIcon = navToggle.querySelector('svg');
        if (isExpanded) {
            toggleIcon.innerHTML = '<path d="M19 12H5M12 19l-7-7 7-7"></path>';
        } else {
            toggleIcon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
        }
    }
    
    // Toggle mobile navigation
    function toggleMobileNav() {
        navContainer.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        const isExpanded = navContainer.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Update mobile menu icon
        const mobileIcon = mobileMenuToggle.querySelector('svg');
        if (isExpanded) {
            mobileIcon.innerHTML = '<path d="M6 18L18 6M6 6l12 12"></path>';
        } else {
            mobileIcon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
        }
    }
    
    // Close mobile navigation
    function closeMobileNav() {
        navContainer.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Reset mobile menu icon
        const mobileIcon = mobileMenuToggle.querySelector('svg');
        mobileIcon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
    }
    
    // Event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }
    
    if (navCollapse) {
        navCollapse.addEventListener('click', toggleNav);
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileNav);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileNav);
    }
    
    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                closeMobileNav();
            }
        });
    });

    // Your existing careers.js functionality continues below...
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check
    
    // CV Form submission (your existing code continues...)
});