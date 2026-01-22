/**
 * CleanHealth Waste Women's Cooperative
 * GSAP Animations
 * Smooth scroll-triggered animations and interactions
 */

(function() {
    'use strict';

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // Configuration
    // ==========================================
    const config = {
        duration: {
            fast: 0.3,
            normal: 0.6,
            slow: 1
        },
        ease: {
            smooth: 'power2.out',
            bounce: 'back.out(1.7)',
            elastic: 'elastic.out(1, 0.5)'
        },
        stagger: 0.1
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================
    // Utility Functions
    // ==========================================
    function createScrollTrigger(element, animation, options = {}) {
        if (prefersReducedMotion) {
            // Skip animations for users who prefer reduced motion
            gsap.set(element, { opacity: 1, clearProps: 'transform' });
            return;
        }

        return ScrollTrigger.create({
            trigger: element,
            start: options.start || 'top 80%',
            end: options.end || 'bottom 20%',
            animation: animation,
            toggleActions: options.toggleActions || 'play none none reverse',
            ...options
        });
    }

    // ==========================================
    // Hero Section Animations
    // ==========================================
    function animateHero() {
        const heroElements = {
            badge: '.hero-badge',
            title: '.hero-title',
            description: '.hero-description',
            cta: '.hero-cta',
            stats: '.hero-stats',
            visual: '.hero-visual'
        };

        // Skip if reduced motion is preferred
        if (prefersReducedMotion) {
            Object.values(heroElements).forEach(selector => {
                const el = document.querySelector(selector);
                if (el) gsap.set(el, { opacity: 1, clearProps: 'all' });
            });
            return;
        }

        // Create timeline for hero entrance
        const heroTimeline = gsap.timeline({
            defaults: { duration: config.duration.normal, ease: config.ease.smooth }
        });

        // Animate elements in sequence
        heroTimeline
            .to(heroElements.badge, {
                opacity: 1,
                y: 0,
                duration: config.duration.fast
            })
            .to(heroElements.title, {
                opacity: 1,
                y: 0
            }, '-=0.3')
            .to(heroElements.description, {
                opacity: 1,
                y: 0
            }, '-=0.3')
            .to(heroElements.cta, {
                opacity: 1,
                y: 0
            }, '-=0.3')
            .to(heroElements.stats, {
                opacity: 1,
                y: 0
            }, '-=0.3')
            .to(heroElements.visual, {
                opacity: 1,
                x: 0,
                duration: config.duration.slow
            }, '-=0.5');
    }

    // ==========================================
    // Section Header Animations
    // ==========================================
    function animateSectionHeaders() {
        const headers = document.querySelectorAll('.section-header');

        headers.forEach(header => {
            const label = header.querySelector('.section-label');
            const title = header.querySelector('.section-title');
            const description = header.querySelector('.section-description');

            const tl = gsap.timeline({ paused: true });

            tl.from(label, {
                opacity: 0,
                y: 20,
                duration: config.duration.fast
            })
            .from(title, {
                opacity: 0,
                y: 30,
                duration: config.duration.normal
            }, '-=0.2')
            .from(description, {
                opacity: 0,
                y: 20,
                duration: config.duration.fast
            }, '-=0.2');

            createScrollTrigger(header, tl);
        });
    }

    // ==========================================
    // Card Animations
    // ==========================================
    function animateCards() {
        // About cards
        gsap.utils.toArray('.about-card').forEach((card, i) => {
            const tl = gsap.timeline({ paused: true });

            tl.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: config.duration.normal,
                ease: config.ease.smooth
            });

            createScrollTrigger(card, tl, {
                start: 'top 85%'
            });
        });

        // Impact cards
        gsap.utils.toArray('.impact-card').forEach((card, i) => {
            const tl = gsap.timeline({ paused: true });

            tl.from(card, {
                opacity: 0,
                y: 60,
                duration: config.duration.normal,
                delay: i * 0.15,
                ease: config.ease.smooth
            });

            createScrollTrigger(card, tl);
        });

        // Service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            const tl = gsap.timeline({ paused: true });

            tl.from(card, {
                opacity: 0,
                y: 80,
                rotationX: 10,
                duration: config.duration.slow,
                delay: i * 0.1,
                ease: config.ease.smooth
            });

            createScrollTrigger(card, tl);
        });

        // Dashboard cards
        gsap.utils.toArray('.dashboard-card').forEach((card, i) => {
            const tl = gsap.timeline({ paused: true });

            tl.from(card, {
                opacity: 0,
                scale: 0.9,
                duration: config.duration.normal,
                delay: i * 0.1,
                ease: config.ease.bounce
            });

            createScrollTrigger(card, tl);
        });
    }

    // ==========================================
    // Process Steps Animation
    // ==========================================
    function animateProcessSteps() {
        const steps = gsap.utils.toArray('.process-step');

        steps.forEach((step, i) => {
            const tl = gsap.timeline({ paused: true });

            // Animate the step number
            const stepNumber = step.querySelector('.step-number');
            const stepContent = step.querySelector('.step-content');
            const stepIcon = step.querySelector('.step-icon');

            tl.from(stepNumber, {
                scale: 0,
                rotation: -180,
                duration: config.duration.normal,
                ease: config.ease.bounce
            })
            .from(stepContent, {
                opacity: 0,
                y: 30,
                duration: config.duration.fast
            }, '-=0.2')
            .from(stepIcon, {
                opacity: 0,
                scale: 0,
                duration: config.duration.fast,
                ease: config.ease.bounce
            }, '-=0.1');

            createScrollTrigger(step, tl, {
                start: 'top 85%'
            });
        });

        // Animate the connecting line
        const processLine = document.querySelector('.process-line');
        if (processLine) {
            gsap.from(processLine, {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: config.duration.slow,
                ease: config.ease.smooth,
                scrollTrigger: {
                    trigger: '.solution-process',
                    start: 'top 70%'
                }
            });
        }
    }

    // ==========================================
    // Values List Animation
    // ==========================================
    function animateValuesList() {
        const values = gsap.utils.toArray('.value-item');

        values.forEach((value, i) => {
            const icon = value.querySelector('.value-icon');
            const content = value.querySelector('.value-content');

            const tl = gsap.timeline({ paused: true });

            tl.from(icon, {
                opacity: 0,
                scale: 0,
                rotation: -90,
                duration: config.duration.fast,
                ease: config.ease.bounce
            })
            .from(content, {
                opacity: 0,
                x: -20,
                duration: config.duration.fast
            }, '-=0.1');

            createScrollTrigger(value, tl, {
                start: 'top 90%'
            });
        });
    }

    // ==========================================
    // Crisis Stats Animation
    // ==========================================
    function animateCrisisStats() {
        const stats = gsap.utils.toArray('.crisis-stat');

        stats.forEach((stat, i) => {
            const tl = gsap.timeline({ paused: true });

            tl.from(stat, {
                opacity: 0,
                y: 40,
                scale: 0.8,
                duration: config.duration.normal,
                delay: i * 0.1,
                ease: config.ease.smooth
            });

            createScrollTrigger(stat, tl);
        });
    }

    // ==========================================
    // Differentiators Animation
    // ==========================================
    function animateDifferentiators() {
        const items = gsap.utils.toArray('.diff-item');

        items.forEach((item, i) => {
            const icon = item.querySelector('.diff-icon');

            const tl = gsap.timeline({ paused: true });

            tl.from(item, {
                opacity: 0,
                y: 30,
                duration: config.duration.fast,
                delay: i * 0.08
            })
            .from(icon, {
                scale: 0,
                rotation: 360,
                duration: config.duration.fast,
                ease: config.ease.bounce
            }, '-=0.2');

            createScrollTrigger(item, tl);
        });
    }

    // ==========================================
    // Operations Timeline Animation
    // ==========================================
    function animateOperationsTimeline() {
        const items = gsap.utils.toArray('.op-item');

        items.forEach((item, i) => {
            const time = item.querySelector('.op-time');
            const content = item.querySelector('.op-content');

            const tl = gsap.timeline({ paused: true });

            tl.from(time, {
                opacity: 0,
                scale: 0,
                duration: config.duration.fast,
                ease: config.ease.bounce
            })
            .from(content, {
                opacity: 0,
                x: 20,
                duration: config.duration.fast
            }, '-=0.1');

            createScrollTrigger(item, tl);
        });
    }

    // ==========================================
    // Founder Card Animation
    // ==========================================
    function animateFounderCard() {
        const card = document.querySelector('.founder-card');
        if (!card) return;

        const image = card.querySelector('.founder-image');
        const info = card.querySelector('.founder-info');
        const expertise = card.querySelectorAll('.founder-expertise li');
        const quote = card.querySelector('.founder-quote');

        const tl = gsap.timeline({ paused: true });

        tl.from(image, {
            opacity: 0,
            x: -50,
            duration: config.duration.normal
        })
        .from(info, {
            opacity: 0,
            x: 50,
            duration: config.duration.normal
        }, '-=0.3')
        .from(expertise, {
            opacity: 0,
            x: 20,
            stagger: 0.1,
            duration: config.duration.fast
        }, '-=0.2')
        .from(quote, {
            opacity: 0,
            y: 20,
            duration: config.duration.fast
        }, '-=0.1');

        createScrollTrigger(card, tl);
    }

    // ==========================================
    // Contact Section Animation
    // ==========================================
    function animateContact() {
        const infoCards = gsap.utils.toArray('.info-card');
        const form = document.querySelector('.contact-form-container');

        // Animate info cards
        infoCards.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                x: -30,
                duration: config.duration.fast,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                }
            });
        });

        // Animate form
        if (form) {
            gsap.from(form, {
                opacity: 0,
                y: 40,
                duration: config.duration.normal,
                scrollTrigger: {
                    trigger: form,
                    start: 'top 80%'
                }
            });
        }
    }

    // ==========================================
    // CTA Section Animation
    // ==========================================
    function animateCTA() {
        const cta = document.querySelector('.cta-section');
        if (!cta) return;

        const content = cta.querySelector('.cta-content');

        gsap.from(content.children, {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: config.duration.normal,
            scrollTrigger: {
                trigger: cta,
                start: 'top 70%'
            }
        });
    }

    // ==========================================
    // Hover Animations
    // ==========================================
    function initHoverAnimations() {
        if (prefersReducedMotion) return;

        // Service cards hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    duration: config.duration.fast
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    duration: config.duration.fast
                });
            });
        });

        // Button hover animations
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    gsap.to(icon, {
                        x: 4,
                        duration: config.duration.fast
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    gsap.to(icon, {
                        x: 0,
                        duration: config.duration.fast
                    });
                }
            });
        });

        // Nav links underline animation
        document.querySelectorAll('.nav-link:not(.nav-link--cta)').forEach(link => {
            const underline = link.querySelector('::after');

            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    color: '#1a7f94',
                    duration: config.duration.fast
                });
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    gsap.to(link, {
                        color: '#334155',
                        duration: config.duration.fast
                    });
                }
            });
        });
    }

    // ==========================================
    // Parallax Effects
    // ==========================================
    function initParallax() {
        if (prefersReducedMotion) return;

        // Hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            gsap.to(heroBackground, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Section backgrounds
        document.querySelectorAll('.section').forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                gsap.to(bg, {
                    y: 50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });
    }

    // ==========================================
    // Reveal Animations on Scroll
    // ==========================================
    function initRevealAnimations() {
        // Generic fade-up elements
        gsap.utils.toArray('.animate-fade-up').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: config.duration.normal,
                ease: config.ease.smooth,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%'
                }
            });
        });

        // Generic fade-left elements
        gsap.utils.toArray('.animate-fade-left').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: config.duration.normal,
                ease: config.ease.smooth,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%'
                }
            });
        });

        // Generic fade-right elements
        gsap.utils.toArray('.animate-fade-right').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: config.duration.normal,
                ease: config.ease.smooth,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%'
                }
            });
        });
    }

    // ==========================================
    // Initialize All Animations
    // ==========================================
    function init() {
        // Only run if GSAP is loaded
        if (typeof gsap === 'undefined') return;

        // Wait for page to be ready
        gsap.set('.animate-fade-up', { opacity: 0, y: 30 });
        gsap.set('.animate-fade-left', { opacity: 0, x: 30 });
        gsap.set('.animate-fade-right', { opacity: 0, x: -30 });

        // Initialize all animation modules
        animateHero();
        animateSectionHeaders();
        animateCards();
        animateProcessSteps();
        animateValuesList();
        animateCrisisStats();
        animateDifferentiators();
        animateOperationsTimeline();
        animateFounderCard();
        animateContact();
        animateCTA();
        initHoverAnimations();
        initParallax();
        initRevealAnimations();

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
    }

    // Run on DOM ready
    document.addEventListener('mainInitialized', init);

    // Fallback
    if (document.readyState === 'complete') {
        setTimeout(init, 100);
    } else {
        window.addEventListener('load', () => setTimeout(init, 100));
    }

    // Export for other modules
    window.CleanHealth = window.CleanHealth || {};
    window.CleanHealth.animations = {
        config,
        init
    };

})();
