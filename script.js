(function () {
  "use strict";

  // ---- mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- promocao real do dia da semana (dados coletados no Instagram/aiqfome) ----
  var PROMOS = {
    3: "Quartou! Barca chisai + 5 guioza por R$ 82,00, ou 8 hot roll + 8 uramaki por R$ 34,90.",
    4: "Quintou! Barca chisai + 5 guioza por R$ 82,00, ou 24 unidades de hot roll por R$ 54,90.",
    5: "Sextou! Barca chisai + 5 guioza por R$ 82,00, ou 16 hot roll por R$ 39,90.",
    6: "Sabadou! Barca chisai + 1 porção de hot roll por R$ 96,90, ou 3 porções de hot roll por R$ 54,90."
  };
  var CLOSED_DAYS = [1, 2]; // segunda e terca

  var ribbon = document.querySelector("#promo-text");
  if (ribbon) {
    var day = new Date().getDay(); // 0 = domingo
    if (CLOSED_DAYS.indexOf(day) > -1) {
      ribbon.textContent = "Hoje a casa está fechada. Atendimento de quarta a domingo, das 18h30 às 22h30.";
    } else if (PROMOS[day]) {
      ribbon.textContent = PROMOS[day];
    } else {
      ribbon.textContent = "Aberto hoje das 18h30 às 22h30, presencial e delivery.";
    }
  }

  // ---- menu: destaque da categoria ativa ao rolar ----
  var catLinks = document.querySelectorAll(".cat-nav a");
  var cats = document.querySelectorAll(".menu-cat");
  if (catLinks.length && cats.length && "IntersectionObserver" in window) {
    var map = {};
    catLinks.forEach(function (link) {
      map[link.getAttribute("href").replace("#", "")] = link;
    });
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            catLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    cats.forEach(function (cat) { obs.observe(cat); });
  }

  // ---- ano corrente no rodape ----
  var yearEl = document.querySelector("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
