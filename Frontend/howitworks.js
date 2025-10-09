// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('navContainer');
    const navToggle = document.getElementById('navToggle');
    const navCollapse = document.getElementById('navCollapse');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navOverlay = document.getElementById('navOverlay');
    
    // Toggle navigation collapsed/expanded state
    function toggleNav() {
        navContainer.classList.toggle('collapsed');
        const isExpanded = !navContainer.classList.contains('collapsed');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
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
        
        const mobileIcon = mobileMenuToggle.querySelector('svg');
        mobileIcon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
    }
    
    // Event listeners
    if (navToggle) navToggle.addEventListener('click', toggleNav);
    if (navCollapse) navCollapse.addEventListener('click', toggleNav);
    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileNav);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileNav);
    
    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) closeMobileNav();
        });
    });

    // Scroll animations for steps and benefits
    const steps = document.querySelectorAll('.step');
    const benefits = document.querySelectorAll('.benefit-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    steps.forEach(step => observer.observe(step));
    benefits.forEach(benefit => observer.observe(benefit));
    
    // Smooth scrolling for anchor links
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
});