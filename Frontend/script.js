// Navigation Toggle Functionality
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
        
        // Trap focus when mobile nav is open
        if (isExpanded) {
            // Focus first nav link
            const firstNavLink = document.querySelector('.nav-link');
            firstNavLink.focus();
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
    navToggle.addEventListener('click', toggleNav);
    navCollapse.addEventListener('click', toggleNav);
    
    mobileMenuToggle.addEventListener('click', toggleMobileNav);
    navOverlay.addEventListener('click', closeMobileNav);
    
    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                closeMobileNav();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Reveal on scroll functionality
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Animated counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 1200; // 1.2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Format number with commas
                    counter.textContent = Math.floor(current).toLocaleString();
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
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
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // In a real implementation, you would send the data to a server here
                setTimeout(() => {
                    alert('Thank you for your enquiry! We will contact you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Close mobile nav with Escape key
        if (e.key === 'Escape' && window.innerWidth < 768 && navContainer.classList.contains('active')) {
            closeMobileNav();
        }
        
        // Skip to main content with 's' key (accessibility shortcut)
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            mainContent.focus();
        }
    });
    
    // Update navigation active state based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize on page load
});