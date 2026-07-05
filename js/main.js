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
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const successCard = document.getElementById('form-success');
  const errorCard = document.getElementById('form-error');

  if (!form || !submitBtn) return;

  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const subjectInput = form.querySelector('#contact-subject');
  const messageInput = form.querySelector('#contact-message');
  const counter = form.querySelector('#message-counter');
  
  const inputs = [nameInput, emailInput, subjectInput, messageInput].filter(Boolean);

  // Character counter for message
  if (messageInput && counter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      counter.textContent = `${len} / 1000`;
    });
  }

  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
      checkFormValidity();
    });
    input.addEventListener('blur', () => {
      validateInput(input);
      checkFormValidity();
    });
  });

  function showError(input, msg) {
    input.classList.add('invalid');
    const errorEl = document.getElementById(`${input.id.replace('contact-', '')}-error`);
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(input) {
    input.classList.remove('invalid');
    const errorEl = document.getElementById(`${input.id.replace('contact-', '')}-error`);
    if (errorEl) errorEl.textContent = '';
  }

  function validateInput(input) {
    const val = input.value.trim();
    if (!val && input.required) {
      showError(input, 'This field is required');
      return false;
    }
    
    if (input.type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
    }
    
    if (input.tagName.toLowerCase() === 'textarea' && val) {
      if (val.length < 10) {
        showError(input, 'Message must be at least 10 characters long');
        return false;
      }
      if (val.length > 1000) {
        showError(input, 'Message cannot exceed 1000 characters');
        return false;
      }
    }

    clearError(input);
    return true;
  }

  function checkFormValidity() {
    const isValid = inputs.every(input => {
      const val = input.value.trim();
      if (!val && input.required) return false;
      if (input.type === 'email' && val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      if (input.tagName.toLowerCase() === 'textarea' && val) {
        return val.length >= 10 && val.length <= 1000;
      }
      return true;
    });
    
    submitBtn.disabled = !isValid;
  }

  // Initial check
  checkFormValidity();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check honeypot
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      return; // Silently fail for bots
    }

    // Final validation check
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    if (btnText) btnText.textContent = 'Sending...';
    successCard.hidden = true;
    errorCard.hidden = true;

    // Disable inputs
    const allInputs = form.querySelectorAll('input, textarea');
    allInputs.forEach(el => el.disabled = true);

    const formData = new FormData(form);
    
    // Load Formspree endpoint from config
    const endpoint = window.APP_CONFIG?.formspreeEndpoint || "https://formspree.io/f/YOUR_FORM_ID";

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        successCard.hidden = false;
        form.reset();
        if (counter) counter.textContent = '0 / 1000';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successCard.hidden = true;
        }, 5000);
      } else {
        // Error
        errorCard.hidden = false;
      }
    } catch (err) {
      // Error
      errorCard.hidden = false;
    } finally {
      // Reset loading state
      submitBtn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Send Message';
      
      // Re-enable inputs
      allInputs.forEach(el => el.disabled = false);
      
      // Re-check validity to update button state
      checkFormValidity();
    }
  });
}
