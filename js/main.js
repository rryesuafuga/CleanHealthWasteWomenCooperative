/**
 * CleanHealth Waste Women's Cooperative
 * Main JavaScript File
 * Handles core functionality, navigation, and UI interactions
 */

(function() {
    'use strict';

    // ==========================================
    // DOM Elements
    // ==========================================
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // ==========================================
    // Loader
    // ==========================================
    function hideLoader() {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 1500);
    }

    // ==========================================
    // Navigation
    // ==========================================
    function initNavigation() {
        // Scroll effect for header
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // Back to Top Button
    // ==========================================
    function initBackToTop() {
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // Counter Animation
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateValue(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;

        const timer = setInterval(() => {
            current += increment * Math.ceil(range / 50);
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString();
        }, stepTime);
    }

    // ==========================================
    // Contact Form
    // ==========================================
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset errors
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            // Validate
            let isValid = true;
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const service = contactForm.querySelector('#service');
            const message = contactForm.querySelector('#message');

            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Valid email is required');
                isValid = false;
            }

            if (!service.value) {
                showError(service, 'Please select a service');
                isValid = false;
            }

            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }

            if (!isValid) return;

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            formStatus.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
            formStatus.className = 'form-status success';

            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        if (errorMessage) errorMessage.textContent = message;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // Hero Particles (Simple Implementation)
    // ==========================================
    function initHeroParticles() {
        const particlesContainer = document.getElementById('hero-particles');
        if (!particlesContainer) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${getRandomParticleColor()};
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 50}px, ${Math.random() * 50}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * -50}px, ${Math.random() * 50}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 50}px, ${Math.random() * -50}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    function getRandomParticleColor() {
        const colors = [
            'rgba(26, 127, 148, 0.6)',   // Primary
            'rgba(230, 168, 0, 0.6)',     // Secondary
            'rgba(100, 143, 255, 0.6)',   // Chart 1
            'rgba(255, 176, 0, 0.6)'      // Chart 2
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ==========================================
    // Accessibility Enhancements
    // ==========================================
    function initAccessibility() {
        // Add keyboard navigation support for custom elements
        const interactiveElements = document.querySelectorAll('.sample-btn, .service-cta');

        interactiveElements.forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
            }

            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });

        // Announce dynamic content changes for screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.classList.add('visually-hidden');
        document.body.appendChild(announcer);

        window.announce = function(message) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        };
    }

    // ==========================================
    // Lazy Loading for Images
    // ==========================================
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ==========================================
    // Initialize All
    // ==========================================
    function init() {
        hideLoader();
        initNavigation();
        initBackToTop();
        animateCounters();
        initContactForm();
        initSmoothScroll();
        initHeroParticles();
        initAccessibility();
        initLazyLoading();

        // Dispatch custom event for other modules
        document.dispatchEvent(new CustomEvent('mainInitialized'));
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for other modules
    window.CleanHealth = window.CleanHealth || {};
    window.CleanHealth.main = {
        animateValue,
        announce: window.announce
    };

})();
