(() => {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setupNavigation() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#mobile-menu");
    const navLinks = [...document.querySelectorAll(".desktop-nav a")];
    const closeMenu = () => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open");
    };
    toggle?.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) { closeMenu(); return; }
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      document.body.classList.add("menu-open");
      menu.querySelector("a")?.focus();
    });
    menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape" && !menu.hidden) { closeMenu(); toggle.focus(); } });
    window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 16), { passive: true });

    const sectionLinks = navLinks.map(link => [link, document.querySelector(link.getAttribute("href"))]).filter(([, section]) => section);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(([link, section]) => link.classList.toggle("active", section === entry.target));
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sectionLinks.forEach(([, section]) => observer.observe(section));
  }

  function setupSystemMap() {
    document.querySelector(".system-canvas")?.setAttribute("role", "region");
    const notes = {
      code: "Start with clear program logic, then make it dependable in the environment where it runs.",
      api: "Define useful boundaries so applications and people can depend on the service contract.",
      package: "Package the application with its runtime needs so it can be reproduced consistently.",
      cloud: "Plan for the environment where a service is deployed, configured, and allowed to grow.",
      observe: "Logs and signals turn a running service into a system that can be understood and improved."
    };
    const note = document.querySelector(".pipeline-note");
    document.querySelectorAll("[data-system-map] .pipeline-node").forEach(node => {
      node.addEventListener("click", () => {
        document.querySelectorAll("[data-system-map] .pipeline-node").forEach(item => { item.classList.remove("active"); item.setAttribute("aria-pressed", "false"); });
        node.classList.add("active"); node.setAttribute("aria-pressed", "true");
        note.textContent = notes[node.dataset.stage];
      });
    });
  }

  function setupReveals() {
    const show = scope => scope.querySelectorAll("[data-reveal]").forEach(element => element.classList.add("revealed"));
    if (reducedMotion) { show(document); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: .1, rootMargin: "0px 0px -35px" });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    window.addEventListener("portfolio:rendered", () => document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element)), { once: true });
  }

  function setupContactForm() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    const button = document.querySelector("#contact-submit");
    if (!form || !status || !button) return;
    const fields = [
      ["contact-name", "Please enter your name."],
      ["contact-email", "Please enter a valid email address."],
      ["contact-message", "Please include a short message (at least 10 characters)."]
    ];
    const validate = () => {
      let valid = true;
      fields.forEach(([id, message]) => {
        const input = document.getElementById(id);
        const error = document.getElementById(`${id}-error`);
        const invalid = !input.value.trim() || (id === "contact-email" && !input.validity.valid) || (id === "contact-message" && input.value.trim().length < 10);
        input.setAttribute("aria-invalid", String(invalid));
        error.textContent = invalid ? message : "";
        if (invalid) valid = false;
      });
      return valid;
    };
    fields.forEach(([id]) => document.getElementById(id)?.addEventListener("blur", validate));
    form.addEventListener("submit", async event => {
      event.preventDefault();
      status.textContent = "";
      if (!validate()) { status.textContent = "Please check the highlighted fields."; return; }
      if (document.getElementById("website").value) { status.textContent = "Thanks. Your message has been received."; form.reset(); return; }
      button.disabled = true; button.querySelector("span").textContent = "Sending…";
      try {
        const endpoint = window.APP_CONFIG?.formspreeEndpoint || form.action;
        const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Submission failed");
        form.reset(); status.textContent = "Message sent. I’ll get back to you as soon as I can.";
      } catch (error) {
        status.textContent = "The message could not be sent right now. Please email me directly instead.";
      } finally {
        button.disabled = false; button.querySelector("span").textContent = "Send message";
      }
    });
  }

  async function loadGitHub() {
    const panel = document.querySelector("#github-panel");
    if (!panel) return;
    try {
      const response = await fetch("https://api.github.com/users/Shri0777/repos?sort=updated&per_page=3", { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) throw new Error("GitHub unavailable");
      const repositories = await response.json();
      if (!repositories.length) return;
      const list = repositories.map(repo => `<a class="github-repo" href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><strong>${repo.name}</strong><span>${repo.language || "Repository"}${repo.stargazers_count ? ` · ${repo.stargazers_count} stars` : ""}</span></a>`).join("");
      panel.innerHTML = `<p class="github-kicker">RECENTLY UPDATED / GITHUB</p><div class="github-repos">${list}</div><a class="github-panel-link" href="https://github.com/Shri0777" target="_blank" rel="noopener noreferrer">Open GitHub profile <span aria-hidden="true">↗</span></a>`;
    } catch (_) { /* The static fallback is intentionally retained. */ }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#year").textContent = new Date().getFullYear();
    setupNavigation(); setupSystemMap(); setupReveals(); setupContactForm(); loadGitHub();
  });
})();
