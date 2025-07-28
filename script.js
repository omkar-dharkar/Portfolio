// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
body.className = savedTheme + '-mode';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.className = newTheme + '-mode';
    localStorage.setItem('theme', newTheme);
    
    // Add a little animation to the toggle button
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.section-header, .project-card, .timeline-item, .skill-category, .stat');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add slide animations to about content
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    
    if (aboutStats) {
        aboutStats.classList.add('slide-in-right');
        observer.observe(aboutStats);
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(10, 10, 10, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = body.classList.contains('dark-mode')
            ? '0 2px 20px rgba(255, 255, 255, 0.1)'
            : '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = body.classList.contains('dark-mode')
            ? 'rgba(10, 10, 10, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const tagline = document.querySelector('.hero-tagline');
    const originalText = tagline.textContent;
    setTimeout(() => {
        typeWriter(tagline, originalText, 150);
    }, 1000);
});

// Contact form interactions (if needed in future)
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Download resume functionality
document.querySelector('.download-resume').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = 'dist\assets\Docs\Omkar_Dharkar_Resume.pdf'; // Replace with actual resume URL
    link.download = 'Omkar_Dharkar_Resume.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show a friendly message
    const originalText = e.target.querySelector('span:last-child').textContent;
    e.target.querySelector('span:last-child').textContent = 'Downloaded!';
    
    setTimeout(() => {
        e.target.querySelector('span:last-child').textContent = originalText;
    }, 2000);
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', reveal);

// Initialize reveal on page load
reveal();

// Add stagger animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    reveal();
}, 16)); // ~60fps
