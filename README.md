# Shri Menakshi Sundaram V - Portfolio

A fast, static personal career website for Shri Menakshi Sundaram V, a software engineering student focused on backend development, cloud foundations, DevOps, systems, APIs, and practical software delivery.

The site is intentionally not a generic developer template. Its core story is "from code to cloud": clear application logic, service boundaries, repeatable packaging, deployment thinking, and observability.

## Highlights

- Recruiter-oriented hero with an interactive engineering delivery path
- Focused technical stack, grouped by engineering role instead of skill percentages
- Data-driven selected projects and detailed case-study dialog
- Featured Universal Log Pre-processing Framework architecture visualization
- Cloud / DevOps workflow and technical trajectory sections
- Optional GitHub API enhancement with a static fallback
- Formspree contact form with validation, loading and failure states, plus a honeypot field
- Responsive navigation, visible keyboard focus, semantic landmarks, and reduced-motion support
- SEO metadata, Open Graph metadata, and Person JSON-LD
- No build step and no framework dependency

## Run Locally

The site uses `fetch()` to load JSON content, so serve it through a local web server rather than opening `index.html` directly.

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173.

Any static host works for deployment, including GitHub Pages, Netlify, Vercel static hosting, or an S3-compatible bucket.

## Project Structure

```text
My-Portfolio/
├── index.html                 # Page structure, identity copy, metadata, SEO
├── css/
│   ├── reset.css              # Small reset and baseline focus treatment
│   ├── variables.css          # Design tokens
│   └── styles.css             # Responsive visual system and components
├── js/
│   ├── config.js              # Formspree endpoint configuration
│   ├── main.js                # Navigation, interactions, form, GitHub enhancement
│   └── renderer.js            # Escaped data rendering and case-study dialog
├── data/
│   ├── projects.json          # Selected project summaries
│   ├── case-studies.json      # Long-form engineering case studies and flows
│   ├── skills.json            # Grouped technical stack
│   ├── journey.json           # Technical development trajectory
│   ├── services.json          # Structured freelance capability content
│   ├── articles.json          # Reserved writing content model
│   └── testimonials.json      # Reserved social-proof content model
└── README.md
```

## Content Model

The active portfolio content is separated from presentation. Update the JSON files to revise technical skills, projects, case studies, and journey content without changing the renderer.

### Project

Add an entry to `data/projects.json`. Each project should reference an existing case study.

```json
{
  "id": "project-id",
  "title": "Project title",
  "label": "Category / context",
  "summary": "A truthful engineering summary.",
  "technologies": ["Java", "REST APIs", "Docker"],
  "featured": false,
  "caseStudy": "project-id"
}
```

### Case Study

Add the corresponding entry in `data/case-studies.json`. The `flow` field powers both the featured architecture panel and the dialog's system flow.

```json
{
  "id": "project-id",
  "title": "Project title",
  "category": "Engineering category",
  "summary": "Short explanation.",
  "problem": "The problem being addressed.",
  "constraints": "Important technical or delivery constraints.",
  "architecture": "How the parts fit together.",
  "implementation": "What was built or prototyped.",
  "decisions": "Key engineering decisions.",
  "challenges": "Challenges encountered.",
  "result": "Truthful outcome.",
  "lessons": "What the work taught.",
  "flow": [["Source", "Input data"], ["Service", "Processing boundary"]]
}
```

Keep project claims evidence-based. Do not add invented employers, clients, metrics, production scale, awards, certifications, or testimonials.

### Skills and Journey

`data/skills.json` contains named groups and their items:

```json
{ "group": "Backend", "items": ["FastAPI", "REST APIs", "PostgreSQL"] }
```

`data/journey.json` contains the six-step technical trajectory:

```json
{ "title": "Backend thinking", "description": "APIs, persistence, validation, and service boundaries." }
```

## Configuration

### Formspree

The existing endpoint is configured in `js/config.js`:

```js
window.APP_CONFIG = {
  formspreeEndpoint: "https://formspree.io/f/mkolyozr"
};
```

Replace it only when moving to another Formspree form. The matching form `action` is also present in `index.html` as a no-JavaScript fallback.

### Production URL

Before deploying, replace every `https://your-domain.example/` value in `index.html` with the real public URL. Those values are used for the canonical link and structured data.

### GitHub

The page links to `https://github.com/Shri0777` and makes an unauthenticated request for up to three recently updated public repositories. No token is used or required. If the API is unavailable or rate-limited, the GitHub section preserves its static profile link and remains functional.

## Design and Interaction Notes

- The interactive hero map lets visitors move through Code, API, Package, Cloud, and Observe stages. It is the site's one intentional technical interaction.
- Project buttons open native HTML dialog case studies with keyboard-accessible close behavior.
- Navigation is sticky and updates its active state by section.
- Motion is limited to reveal and state transitions. `prefers-reduced-motion: reduce` disables nonessential movement.
- The mobile layout is intentionally single-column, with a compact menu and stable control sizes.

## Accessibility

- Semantic `header`, `nav`, `main`, `section`, `footer`, form labels, and heading hierarchy
- Skip link and visible focus styles
- Native dialog with an accessible label and close control
- Accessible live regions for the engineering map, data load areas, and form feedback
- Form fields expose invalid state and adjacent error messages
- Reduced-motion support

## Verification

Run the following basic checks after edits:

```bash
node --check js/main.js
node --check js/renderer.js
node -e "for (const f of require('fs').readdirSync('data')) JSON.parse(require('fs').readFileSync('data/' + f)); console.log('All data JSON is valid')"
```

Then serve the site locally and verify desktop and mobile views, the mobile menu, interactive system map, project dialogs, GitHub fallback behavior, and contact form feedback.

## License

This portfolio is personal to Shri Menakshi Sundaram V. Reuse the implementation only with appropriate attribution and replacement of personal content.
