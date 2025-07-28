// Main JavaScript for Parbat Furniture Website
(function () {
    'use strict';

    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile Navigation Toggle
    function initMobileNav() {
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');

                // Update ARIA attributes for accessibility
                const isExpanded = navMenu.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function (e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Header Scroll Effect
    function initHeaderScroll() {
        if (header) {
            let lastScrollTop = 0;
            const headerHeight = header.offsetHeight;

            window.addEventListener('scroll', function () {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Add shadow on scroll
                if (scrollTop > 10) {
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }

                // Hide/show header on scroll (optional)
                if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScrollTop = scrollTop;
            }, { passive: true });
        }
    }

    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member, .process-step');

        animatedElements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

            observer.observe(el);
        });
    }

    // Form Validation (if contact forms are added)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');

                        // Remove error class on input
                        field.addEventListener('input', function () {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    }

    // Lazy Loading for Images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Map Interaction Enhancement
    function initMapEnhancements() {
        const mapContainer = document.querySelector('#map-container');
        const mapIframe = document.querySelector('#map-container iframe');

        if (mapContainer && mapIframe) {
            // Prevent scroll hijacking on mobile
            mapContainer.addEventListener('click', function () {
                mapIframe.style.pointerEvents = 'auto';
            });

            mapContainer.addEventListener('mouseleave', function () {
                mapIframe.style.pointerEvents = 'none';
            });

            // Re-enable pointer events on touch devices
            mapContainer.addEventListener('touchstart', function () {
                mapIframe.style.pointerEvents = 'auto';
            });
        }
    }

    // Performance Monitoring
    function initPerformanceMonitoring() {
        // Log Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }

    // Error Handling
    function initErrorHandling() {
        window.addEventListener('error', function (e) {
            console.error('JavaScript Error:', e.error);
            // You can send this to your analytics service
        });

        window.addEventListener('unhandledrejection', function (e) {
            console.error('Unhandled Promise Rejection:', e.reason);
            // You can send this to your analytics service
        });
    }

    // Accessibility Enhancements
    function initAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -100px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px 12px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s ease;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            visibility: hidden;
        `;

        skipLink.addEventListener('focus', function () {
            this.style.top = '6px';
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        });

        skipLink.addEventListener('blur', function () {
            this.style.top = '-100px';
            this.style.opacity = '0';
            this.style.visibility = 'hidden';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Keyboard navigation for mobile menu
        if (navToggle) {
            navToggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    }

    // FAQ Functionality
    function initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', function () {
                const answer = this.nextElementSibling;
                const isActive = answer.classList.contains('active');

                // Close all other FAQ answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });

                // Toggle current answer
                if (!isActive) {
                    answer.classList.add('active');
                }

                // Update aria-expanded attribute
                this.setAttribute('aria-expanded', !isActive);
            });
        });
    }

    // Initialize all functions when DOM is loaded
    function init() {
        initMobileNav();
        initHeaderScroll();
        initSmoothScrolling();
        initScrollAnimations();
        initFormValidation();
        initLazyLoading();
        initMapEnhancements();
        initAccessibility();
        initFAQ();

        // Initialize performance monitoring in production
        if (window.location.hostname !== 'localhost') {
            initPerformanceMonitoring();
        }

        initErrorHandling();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Service Worker Registration for PWA (optional)
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js')
                .then(function (registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function (registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

})();

// Google Analytics (replace with your tracking ID)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'GA_TRACKING_ID');

// Schema.org structured data for better SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Parbat Furniture Udhyog",
    "image": window.location.origin + "/static/images/logo.png",
    "description": "Premium quality furniture manufacturer and supplier in Nepal",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pokhara-5, Shantinagar Chowk",
        "addressLocality": "Pokhara",
        "addressCountry": "Nepal"
    },
    "telephone": "+977-9817109058",
    "email": "anilghatan7@gmail.com",
    "url": window.location.origin,
    "priceRange": "$$",
    "openingHours": "Mo-Sa 09:00-18:00"
};

// Inject structured data
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);