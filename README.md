# Personal Portfolio — Shri Menakshi Sundaram V

A minimal, premium personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Quick Start

Open `index.html` in a browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

> **Note:** The site must be served via a web server (not `file://`) for the JSON data loading to work.

---

## Adding Content

All content is managed through JSON files in the `data/` directory. Edit the JSON, refresh the page, and your changes appear immediately.

### Add a New Project

Edit `data/projects.json` and add an object:

```json
{
  "title": "Project Name",
  "description": "A short description of the project.",
  "thumbnail": "assets/images/project-name.webp",
  "technologies": ["Python", "FastAPI", "Docker"],
  "github": "https://github.com/Shri0777/project-name",
  "demo": "https://project-demo.com",
  "caseStudy": "case-study-id",
  "featured": true
}
```

- Set `featured: true` to display on the homepage
- Leave `thumbnail`, `demo`, or `caseStudy` as empty strings `""` if not applicable
- `caseStudy` should match the `id` field of a case study in `case-studies.json`

### Add a New Case Study

Edit `data/case-studies.json` and add an object:

```json
{
  "id": "unique-case-study-id",
  "title": "Case Study Title",
  "category": "Backend Development",
  "summary": "A brief overview that appears on the card.",
  "problem": "Description of the problem...",
  "research": "What research was done...",
  "planning": "How the project was planned...",
  "architecture": "Technical architecture details...",
  "implementation": "How it was built...",
  "challenges": "What challenges arose...",
  "solution": "How challenges were solved...",
  "results": "Measurable outcomes...",
  "lessonsLearned": "Key takeaways..."
}
```

### Add a New Article

Edit `data/articles.json` and add an object:

```json
{
  "title": "Article Title",
  "summary": "A short summary for the card.",
  "category": "Backend Development",
  "date": "2026-07-01",
  "readingTime": "5 min",
  "url": "https://link-to-article.com"
}
```

### Add/Edit Services

Edit `data/services.json`. Available icons: `server`, `layers`, `zap`, `code`, `layout`, `brain`.

### Add/Edit Testimonials

Edit `data/testimonials.json`:

```json
{
  "quote": "Client review text...",
  "name": "Client Name",
  "company": "Company Name",
  "photo": "assets/images/client-photo.webp"
}
```

- Leave `photo` as `""` to show the client's initial instead

---

## Project Structure

```
MY_PORTFOLIO/
├── index.html           # Single-page site
├── css/
│   ├── reset.css        # CSS reset
│   ├── variables.css    # Design tokens
│   └── styles.css       # Component styles
├── js/
│   ├── main.js          # Navigation, scroll, animations
│   └── renderer.js      # Renders data from JSON files
├── data/
│   ├── projects.json    # Project entries
│   ├── case-studies.json# Case study entries
│   ├── articles.json    # Article entries
│   ├── services.json    # Service offerings
│   └── testimonials.json# Client testimonials
├── assets/
│   └── images/          # Project thumbnails, photos
└── README.md            # This file
```

---

## Customization

### Colors

Edit `css/variables.css` to change the color palette:

```css
--color-accent: #2563EB;     /* Change accent color */
--color-text: #111111;       /* Change primary text */
--color-bg: #FFFFFF;         /* Change background */
```

### Personal Information

Update the following in `index.html`:
- Hero section: name, roles, description
- Contact section: email, GitHub, LinkedIn, location
- Footer: copyright name
- `<title>` and `<meta>` tags

---

## Performance

- No build step required
- Minimal JavaScript (~8KB total)
- Lazy-loaded images
- System font stack fallback
- Inline SVG icons (no icon library requests)
- CSS transitions only (no animation libraries)
