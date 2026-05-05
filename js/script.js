// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form handling
    initContactForm();

    // Back to top
    initBackToTop();

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

    // Counter animation (if needed)
    // initCounters();

    // Parallax effect
    initParallax();
});

// ===== CONTACT FORM FUNCTIONALITY (SAME AS ORIGINAL) =====
function initContactForm() {
    const form = document.getElementById("contactForm");
    const msgDiv = document.getElementById("msg");
    const submitBtn = form?.querySelector('button[type="submit"]');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoader = submitBtn?.querySelector('.btn-loader');

    if (!form) return;

    form.addEventListener("submit", function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        form.classList.add('loading');

        const formData = new FormData(form);

        fetch("php/submit.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            const response = data.trim();

            if (response === "success") {
                msgDiv.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle"></i>
                        ✅ Application Submitted Successfully! We'll contact you within 24 hours.
                    </div>
                `;
                form.reset();
            } else if (response === "duplicate") {
                msgDiv.innerHTML = `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        ⚠️ You have already applied! We'll contact you soon.
                    </div>
                `;
            } else {
                msgDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-times-circle"></i>
                        ❌ Something went wrong. Please try again.
                    </div>
                `;
            }

            // Auto hide message
            setTimeout(() => {
                msgDiv.innerHTML = "";
            }, 5000);

        })
        .catch(error => {
            console.error("Error:", error);
            msgDiv.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-times-circle"></i>
                    ❌ Network error. Please check your connection.
                </div>
            `;
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            form.classList.remove('loading');
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const heroImg = document.querySelector('.hero-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== COUNTER ANIMATION (Optional) =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current) + '+';
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== MOBILE MENU ENHANCEMENT =====
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.body.style.overflow = 'hidden';
});



// Close menu on link click (mobile)
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();
    });
});

document.querySelector('.navbar-collapse').addEventListener('hidden.bs.collapse', function() {
    document.body.style.overflow = 'auto';
});

// ===== PARTICLE SYSTEM (Optional Enhancement) =====
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        heroSection.appendChild(particle);
    }
}

// Uncomment to enable particles
// createParticles();

// ===== FORM VALIDATION ENHANCEMENT =====
(function() {
    'use strict';
    
    // Custom validation styles
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            }
        });
    });
})();

// ===== PERFECT SMOOTH SCROLL WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        window.scrollTo({
            top: target.offsetTop - navbarHeight - 20,
            behavior: 'smooth'
        });
    });
});

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate AOS positions
        AOS.refresh();
    }, 250);
});

// ===== SERVICE WORKER REGISTRATION (PWA Ready) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
