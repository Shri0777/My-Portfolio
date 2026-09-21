(() => {
  "use strict";

  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const getData = async path => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return response.json();
  };

  let caseStudies = [];

  function renderStack(groups) {
    const target = document.querySelector("#stack-grid");
    if (!target) return;
    target.innerHTML = groups.map(group => `<section class="stack-group"><h3>${escapeHtml(group.group)}</h3><ul>${group.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("");
  }

  function renderProjects(projects) {
    const target = document.querySelector("#projects-grid");
    if (!target) return;
    target.innerHTML = projects.map((project, index) => `<article class="project" data-reveal><div class="project-index">0${index + 1}</div><div><p class="project-type">${escapeHtml(project.label)}</p><h3>${escapeHtml(project.title)}</h3><div class="project-tags">${project.technologies.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div></div><div><p>${escapeHtml(project.summary)}</p></div><button class="project-action" type="button" data-open-case="${escapeHtml(project.caseStudy)}">Read engineering notes <span aria-hidden="true">↗</span></button></article>`).join("");
  }

  function renderFeaturedCase(study) {
    const target = document.querySelector("#case-study-feature");
    if (!target || !study) return;
    target.innerHTML = `<div class="case-feature"><div><p class="eyebrow eyebrow-lime">Architecture-led project</p><h2 id="case-title">${escapeHtml(study.title)}</h2><p class="case-summary">${escapeHtml(study.summary)}</p><div class="case-buttons"><button class="button button-primary" type="button" data-open-case="${escapeHtml(study.id)}">Open full case study <span aria-hidden="true">↗</span></button></div></div><div class="architecture"><div class="arch-title"><span>Architecture flow</span><span>TRACEABLE</span></div><div class="architecture-flow">${study.flow.map(([stage, description]) => `<div class="architecture-node"><strong>${escapeHtml(stage)}</strong><span>${escapeHtml(description)}</span></div>`).join("")}</div></div></div>`;
  }

  function renderJourney(steps) {
    const target = document.querySelector("#journey-track");
    if (!target) return;
    target.innerHTML = steps.map((step, index) => `<article class="journey-step"><span>0${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></article>`).join("");
  }

  function openCaseStudy(id) {
    const study = caseStudies.find(item => item.id === id);
    const dialog = document.querySelector("#case-dialog");
    const content = document.querySelector("#case-dialog-content");
    if (!study || !dialog || !content) return;
    const sections = [
      ["Problem", study.problem], ["Constraints", study.constraints], ["Architecture", study.architecture], ["Implementation", study.implementation], ["Engineering decisions", study.decisions], ["Challenges", study.challenges], ["Result", study.result], ["Lessons", study.lessons]
    ];
    content.innerHTML = `<p class="dialog-kicker">${escapeHtml(study.category)}</p><h2 class="dialog-title" id="dialog-title">${escapeHtml(study.title)}</h2>${sections.map(([title, text]) => `<section class="dialog-section"><h3>${title}</h3><p>${escapeHtml(text)}</p></section>`).join("")}<section class="dialog-section"><h3>System flow</h3><div class="dialog-architecture">${study.flow.map(([stage, description]) => `<span>${escapeHtml(stage)}: ${escapeHtml(description)}</span>`).join("")}</div></section>`;
    dialog.showModal();
    dialog.querySelector(".dialog-close").focus();
  }

  async function initialise() {
    try {
      const [skills, projects, studies, journey] = await Promise.all([getData("data/skills.json"), getData("data/projects.json"), getData("data/case-studies.json"), getData("data/journey.json")]);
      caseStudies = studies;
      renderStack(skills);
      renderProjects(projects);
      renderFeaturedCase(studies.find(study => study.id === "universal-log-framework"));
      renderJourney(journey);
      window.dispatchEvent(new Event("portfolio:rendered"));
    } catch (error) {
      console.error(error);
      document.querySelectorAll("[aria-live='polite']").forEach(element => {
        if (!element.innerHTML.trim()) element.textContent = "Content is currently unavailable.";
      });
    }
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-case]");
    if (trigger) openCaseStudy(trigger.dataset.openCase);
    if (event.target.closest(".dialog-close")) document.querySelector("#case-dialog")?.close();
  });
  document.querySelector("#case-dialog")?.addEventListener("click", event => {
    if (event.target.nodeName === "DIALOG") event.currentTarget.close();
  });
  document.addEventListener("DOMContentLoaded", initialise);
})();
