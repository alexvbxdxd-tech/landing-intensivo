/* ============================
   MENÚ MÓVIL (hamburguesa)
============================ */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

function setMenu(open) {
  if (!toggle || !nav) return;
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

if (toggle && nav) {
  // Abrir/cerrar con click
  toggle.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("is-open");
    setMenu(isOpen);
  });

  // Cerrar al hacer click en un enlace
  nav.addEventListener("click", (e) => {
    if (e.target.matches("a")) setMenu(false);
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Reset en cambio de tamaño (si vuelves a desktop)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 720) setMenu(false);
    }, 120);
  });
}

/* ============================
   HERO → scroll suave
============================ */
const btn = document.getElementById("btnEmpezar");
if (btn) {
  btn.addEventListener("click", () => {
    const target = document.querySelector("#servicios");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ============================
   Hover de tarjetas (delegación)
============================ */
document.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".card");
  if (card) card.dataset.hover = "1";
});
document.addEventListener("mouseout", (e) => {
  const card = e.target.closest(".card");
  if (card) delete card.dataset.hover;
});

/* ============================
   (Opcional) Enlace activo en scroll
   Marca en el nav la sección visible
============================ */
const sections = [
  { id: "#servicios", link: 'a[href="#servicios"]' },
  { id: "#contacto",  link: 'a[href="#contacto"]'  },
];

function markActiveLink() {
  let active = null;
  sections.forEach(({ id, link }) => {
    const el = document.querySelector(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight * 0.35 && rect.bottom >= 120;
    if (inView) active = link;
  });

  document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
  if (active) document.querySelector(active)?.classList.add("active");
}

window.addEventListener("scroll", markActiveLink, { passive: true });
window.addEventListener("load", markActiveLink);

/* ============================
   Reveal on scroll con IntersectionObserver
============================ */
const observer = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // una vez mostrado, deja de observar
        }
      });
    }, { threshold: 0.15 })
  : null;

// Observa todos los .reveal
document.querySelectorAll('.reveal').forEach(el => {
  if (observer) observer.observe(el);
  else el.classList.add('show'); // fallback
});

