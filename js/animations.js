/**
 * CleanHealth Waste Women's Cooperative
 * GSAP Animations - Simplified for reliability
 */

(function() {
    'use strict';

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded - skipping animations');
        // Make sure all content is visible
        document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Make all content visible for reduced motion users
        document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ==========================================
    // Simple Fade-In Animations
    // ==========================================
    function initAnimations() {
        // Animate hero elements immediately
        gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
        gsap.to('.hero-title', { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
        gsap.to('.hero-description', { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
        gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
        gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.5, delay: 0.6 });
        gsap.to('.hero-visual', { opacity: 1, x: 0, duration: 0.7, delay: 0.4 });

        // ScrollTrigger animations for sections
        if (typeof ScrollTrigger !== 'undefined') {
            // Section headers
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.fromTo(header,
                    { opacity: 0.3, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: header,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Cards
            gsap.utils.toArray('.about-card, .impact-card, .service-card, .dashboard-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0.3, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Process steps
            gsap.utils.toArray('.process-step').forEach((step, i) => {
                gsap.fromTo(step,
                    { opacity: 0.3, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: step,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Value items
            gsap.utils.toArray('.value-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0.3, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 95%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Differentiator items
            gsap.utils.toArray('.diff-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0.3, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: i * 0.08,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 95%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        }
    }

    // ==========================================
    // Hover Animations
    // ==========================================
    function initHoverAnimations() {
        // Service cards hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', duration: 0.3 });
            });
        });

        // Button icons
        document.querySelectorAll('.btn').forEach(btn => {
            const icon = btn.querySelector('.btn-icon');
            if (icon) {
                btn.addEventListener('mouseenter', () => gsap.to(icon, { x: 4, duration: 0.2 }));
                btn.addEventListener('mouseleave', () => gsap.to(icon, { x: 0, duration: 0.2 }));
            }
        });
    }

    // ==========================================
    // Initialize
    // ==========================================
    function init() {
        // Set initial states for hero elements
        gsap.set('.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-stats', { opacity: 0, y: 30 });
        gsap.set('.hero-visual', { opacity: 0, x: 30 });

        // Run animations
        initAnimations();
        initHoverAnimations();

        // Refresh ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
