// Small, tasteful motion + form UX
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for internal links (respect reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  // Lightweight parallax on hero glints/smoke (desktop only)
  const hero = document.querySelector(".hero");
  const smoke = document.querySelector(".smoke");
  const glints = document.querySelector(".glints");

  if (!prefersReduced && hero && smoke && glints) {
    let raf = null;

    window.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        smoke.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0) scale(1.04)`;
        glints.style.transform = `translate3d(${x * 18}px, ${y * 10}px, 0) rotate(-8deg)`;
      });
    });
  }

  // Form toast (works even without Netlify; just gives feedback)
  const form = document.querySelector('form[name="fury-mailing-list"]');
  const toast = document.querySelector(".form__toast");
  if (form && toast) {
    form.addEventListener("submit", () => {
      toast.textContent = "Sending…";
      setTimeout(() => {
        toast.textContent =
          "If this is live on Netlify, you’re on the list. If not, publish it and try again.";
      }, 800);
    });
  }
})();
