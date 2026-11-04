/* ===== Paberseg – scripts ===== */

// >>> CONFIGURAÇÃO: troque pelo número de WhatsApp da empresa (DDI + DDD + número, só dígitos)
const WHATSAPP_NUMBER = "551836441516";
const WHATSAPP_DEFAULT_MSG = "Olá! Vim pelo site da Paberseg e gostaria de mais informações.";

(function () {
  "use strict";

  const waLink = (text) =>
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

  // Links de WhatsApp
  document.querySelectorAll(".js-whats").forEach((a) => {
    a.href = waLink(WHATSAPP_DEFAULT_MSG);
  });

  // Ano no rodapé
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Header com sombra ao rolar
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  // Filtro de serviços
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".card");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      cards.forEach((card) => {
        card.hidden = !(filter === "all" || card.dataset.cat === filter);
      });
    });
  });

  // Animação de entrada
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Máscara simples de telefone
  const tel = document.querySelector('input[name="telefone"]');
  tel.addEventListener("input", () => {
    let d = tel.value.replace(/\D/g, "").slice(0, 11);
    if (d.length > 10) d = d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    else if (d.length > 6) d = d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    else if (d.length > 2) d = d.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    else if (d.length > 0) d = d.replace(/^(\d{0,2})/, "($1");
    tel.value = d;
  });

  // Formulário -> WhatsApp
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.value.trim().length > 0 &&
        (field.name !== "telefone" || field.value.replace(/\D/g, "").length >= 10);
      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      msg.textContent = "Preencha seu nome e um telefone válido.";
      msg.className = "form__msg error";
      return;
    }

    const fields = [
      ["Nome", data.nome],
      ["Empresa", data.empresa],
      ["Telefone", data.telefone],
      ["Colaboradores", data.colaboradores],
      ["Serviço", data.servico],
      ["Mensagem", data.mensagem],
    ]
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => "*" + k + ":* " + v.trim());
    const text = "Olá! Gostaria de solicitar um orçamento pelo site da Paberseg.\n\n" + fields.join("\n");

    window.open(waLink(text), "_blank", "noopener");
    msg.textContent = "Abrindo o WhatsApp… Obrigado pelo contato!";
    msg.className = "form__msg success";
    form.reset();
  });
})();
