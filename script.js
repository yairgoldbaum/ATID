const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const quoteForm = document.querySelector("[data-quote-form]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeNav() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

year.textContent = new Date().getFullYear();

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const name = formData.get("name") || "";
  const company = formData.get("company") || "";
  const email = formData.get("email") || "";
  const product = formData.get("product") || "";
  const message = formData.get("message") || "";

  const body = [
    `Nombre: ${name}`,
    `Empresa: ${company}`,
    `Correo: ${email}`,
    `Producto de interés: ${product}`,
    "",
    "Mensaje:",
    message
  ].join("\n");

  const subject = `Consulta comercial ATID - ${product}`;
  window.location.href = `mailto:info@atid.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
