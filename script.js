// ========================================
// Theme Management
// ========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    
    // Update page title for accessibility
    const themeLabel = newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', themeLabel);
});

// ========================================
// Smooth Scroll Enhancement
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Add Animation on Scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to skill tags and resume items
document.querySelectorAll('.skill-tag, .resume-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ========================================
// Keyboard Accessibility
// ========================================

// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('.skill-tag, .btn, .contact-card').forEach(el => {
    if (!el.hasAttribute('tabindex') && el.tagName !== 'A' && el.tagName !== 'BUTTON') {
        el.setAttribute('tabindex', '0');
    }
});

// ========================================
// Print Styles Support
// ========================================

window.addEventListener('beforeprint', () => {
    // Ensure light theme is used for printing
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('printWasDark', 'true');
    }
});

window.addEventListener('afterprint', () => {
    // Restore dark theme if it was active before printing
    if (localStorage.getItem('printWasDark') === 'true') {
        body.classList.add('dark-theme');
        localStorage.removeItem('printWasDark');
    }
});
