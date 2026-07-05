/* =========================================
   Main JS — Navigation, Scroll, Animations
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initSmoothScroll();
  initFadeAnimations();
  initContactForm();
});


/* ---- Navbar scroll effect ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar__link, .mobile-nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  // Scroll → translucent
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active section highlight
  const observerOptions = {
    rootMargin: '-20% 0px -75% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}


/* ---- Mobile navigation ---- */
function initMobileNav() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  if (!hamburger || !mobileNav || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}


/* ---- Smooth scrolling ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = 64;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}


/* ---- Fade-in animations ---- */
function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));
}


/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.querySelector('.form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      return;
    }

    // Show success (replace with actual form submission)
    // For now: mailto fallback
    const subject = form.querySelector('#contact-subject')?.value || 'Portfolio Contact';
    const body = `Name: ${name.value}%0D%0AEmail: ${email.value}%0D%0A%0D%0A${message.value}`;
    window.location.href = `mailto:smmeenakshisundarm@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Show success message
    if (successMsg) {
      successMsg.classList.add('visible');
      setTimeout(() => successMsg.classList.remove('visible'), 5000);
    }

    form.reset();
  });
}
