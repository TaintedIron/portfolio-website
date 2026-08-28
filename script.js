const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const body = document.body;
const year = document.getElementById('year');

const themeStorageKey = 'theme';
const savedTheme = localStorage.getItem(themeStorageKey);

if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

const syncThemeToggle = () => {
    if (!themeToggle) {
        return;
    }

    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};

syncThemeToggle();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem(themeStorageKey, body.classList.contains('dark-theme') ? 'dark' : 'light');
        syncThemeToggle();
    });
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navLinks.classList.toggle('open', !isExpanded);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

const resumePreviewToggle = document.getElementById('resumePreviewToggle');
const resumeFrameWrap = document.getElementById('resumeFrameWrap');

if (resumePreviewToggle && resumeFrameWrap) {
    resumePreviewToggle.addEventListener('click', () => {
        const isOpen = resumeFrameWrap.hasAttribute('hidden') === false;
        resumeFrameWrap.toggleAttribute('hidden', isOpen);
        resumePreviewToggle.classList.toggle('is-active', !isOpen);
        resumePreviewToggle.setAttribute('aria-expanded', String(!isOpen));
        resumePreviewToggle.textContent = isOpen ? 'Show PDF Preview' : 'Hide PDF Preview';
    });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('show'));
}

if (year) {
    year.textContent = String(new Date().getFullYear());
}

window.addEventListener('beforeprint', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('printWasDark', 'true');
    }
});

window.addEventListener('afterprint', () => {
    if (localStorage.getItem('printWasDark') === 'true') {
        body.classList.add('dark-theme');
        localStorage.removeItem('printWasDark');
    }
});
