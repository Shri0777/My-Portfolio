/* =========================================
   Renderer — Renders JSON data into HTML
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderCaseStudies();
  renderArticles();
  renderServices();
  renderTestimonials();
});


/* ---- SVG Icons ---- */
const icons = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  server: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  layout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  brain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-1.5 3.1A4 4 0 0 1 16 13a4 4 0 0 1-3 3.87V20a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-3.13A4 4 0 0 1 6 13a4 4 0 0 1 1.5-3.1A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/><path d="M10 8.5a2.5 2.5 0 0 1 4 0"/><path d="M10 15.5a2.5 2.5 0 0 0 4 0"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
};


/* ---- Utility: fetch JSON ---- */
async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.warn(`Could not load ${path}:`, err.message);
    return [];
  }
}


/* ---- Format date ---- */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}


/* ---- Projects ---- */
async function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const projects = await fetchJSON('data/projects.json');
  const featured = projects.filter(p => p.featured);

  if (!featured.length) {
    container.innerHTML = '<p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">Projects coming soon.</p>';
    return;
  }

  container.innerHTML = featured.map(project => `
    <article class="project-card fade-in" aria-label="${project.title}">
      ${project.thumbnail
        ? `<img class="project-card__thumbnail" src="${project.thumbnail}" alt="${project.title}" loading="lazy" />`
        : `<div class="project-card__thumbnail" aria-hidden="true" style="display:flex;align-items:center;justify-content:center;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
           </div>`
      }
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        <div class="project-card__tags">
          ${project.technologies.map(t => `<span class="project-card__tag">${t}</span>`).join('')}
        </div>
        <div class="project-card__actions">
          ${project.github ? `<a href="${project.github}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">${icons.github} GitHub</a>` : ''}
          ${project.demo ? `<a href="${project.demo}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="View live demo">${icons.externalLink} Live Demo</a>` : ''}
          ${project.caseStudy ? `<a href="#case-studies" class="btn btn--secondary btn--sm" aria-label="Read case study">${icons.book} Case Study</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Re-initialize fade animations for dynamically added elements
  initDynamicFade(container);
}


/* ---- Case Studies ---- */
async function renderCaseStudies() {
  const container = document.getElementById('case-studies-grid');
  if (!container) return;

  const caseStudies = await fetchJSON('data/case-studies.json');

  if (!caseStudies.length) {
    container.innerHTML = '<p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">Case studies coming soon.</p>';
    return;
  }

  container.innerHTML = caseStudies.map((cs, i) => `
    <article class="case-study-card fade-in" data-case-study-index="${i}" aria-label="${cs.title}" tabindex="0" role="button">
      <span class="case-study-card__category">${cs.category}</span>
      <h3 class="case-study-card__title">${cs.title}</h3>
      <p class="case-study-card__summary">${cs.summary}</p>
      <span class="case-study-card__link">
        Read case study ${icons.arrow}
      </span>
    </article>
  `).join('');

  // Attach click handlers
  container.querySelectorAll('.case-study-card').forEach(card => {
    const handler = () => {
      const index = parseInt(card.dataset.caseStudyIndex);
      openCaseStudyModal(caseStudies[index]);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });

  initDynamicFade(container);
}


/* ---- Case Study Modal ---- */
function openCaseStudyModal(cs) {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;

  const sections = [
    { title: 'The Problem', content: cs.problem },
    { title: 'Research', content: cs.research },
    { title: 'Planning', content: cs.planning },
    { title: 'Architecture', content: cs.architecture },
    { title: 'Implementation', content: cs.implementation },
    { title: 'Challenges', content: cs.challenges },
    { title: 'Solution', content: cs.solution },
    { title: 'Results', content: cs.results },
    { title: 'Lessons Learned', content: cs.lessonsLearned }
  ].filter(s => s.content);

  modal.querySelector('.case-study-modal__category').textContent = cs.category;
  modal.querySelector('.case-study-modal__title').textContent = cs.title;

  const body = modal.querySelector('.case-study-modal__body');
  body.innerHTML = sections.map(s => `
    <div class="case-study-modal__section">
      <h3 class="case-study-modal__section-title">${s.title}</h3>
      <p class="case-study-modal__section-body">${s.content}</p>
    </div>
  `).join('');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Close handlers
  const closeBtn = modal.querySelector('.case-study-modal__close');
  const overlay = modal.querySelector('.case-study-modal__overlay');

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.onclick = close;
  overlay.onclick = close;
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  });
}


/* ---- Articles ---- */
async function renderArticles() {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  const articles = await fetchJSON('data/articles.json');

  if (!articles.length) {
    container.innerHTML = '<p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">Articles coming soon.</p>';
    return;
  }

  container.innerHTML = articles.map(article => `
    <article class="article-card fade-in" aria-label="${article.title}">
      <div class="article-card__meta">
        <span class="article-card__category">${article.category}</span>
        <span class="article-card__dot"></span>
        <span class="article-card__reading-time">${article.readingTime}</span>
        <span class="article-card__dot"></span>
        <span class="article-card__date">${formatDate(article.date)}</span>
      </div>
      <h3 class="article-card__title">${article.title}</h3>
      <p class="article-card__summary">${article.summary}</p>
    </article>
  `).join('');

  initDynamicFade(container);
}


/* ---- Services ---- */
async function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const services = await fetchJSON('data/services.json');

  if (!services.length) {
    container.innerHTML = '<p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">Services information coming soon.</p>';
    return;
  }

  container.innerHTML = services.map(service => `
    <div class="service-card fade-in">
      <div class="service-card__icon">
        ${icons[service.icon] || icons.code}
      </div>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__description">${service.description}</p>
      <ul class="service-card__deliverables">
        ${service.deliverables.map(d => `<li class="service-card__deliverable">${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  initDynamicFade(container);
}


/* ---- Testimonials ---- */
async function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  const testimonials = await fetchJSON('data/testimonials.json');

  if (!testimonials.length) {
    container.innerHTML = '';
    // Hide testimonials section if no data
    const section = container.closest('.testimonials');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial-card fade-in">
      <p class="testimonial-card__quote">${t.quote}</p>
      <div class="testimonial-card__author">
        ${t.photo
          ? `<img class="testimonial-card__photo" src="${t.photo}" alt="${t.name}" loading="lazy" />`
          : `<div class="testimonial-card__photo" style="display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:var(--color-text-tertiary);">${t.name.charAt(0)}</div>`
        }
        <div class="testimonial-card__info">
          <span class="testimonial-card__name">${t.name}</span>
          <span class="testimonial-card__company">${t.company}</span>
        </div>
      </div>
    </div>
  `).join('');

  initDynamicFade(container);
}


/* ---- Dynamic fade for injected elements ---- */
function initDynamicFade(container) {
  const elements = container.querySelectorAll('.fade-in:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}
