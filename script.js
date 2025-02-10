// script.js

// Konami code sequence
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

// Pour accumuler les touches tapées
let typedText = "";

// Quatre thèmes possibles :
const THEME_PRO = "pro";
const THEME_LOL = "lol";
const THEME_MARIO = "mario";

// Au chargement DOM
document.addEventListener("DOMContentLoaded", () => {
  // 1. Appliquer le thème mémorisé dans localStorage (ou pro par défaut)
  applyStoredTheme();

  // 2. Lancer les animations d'apparition
  animateElements();

  // 3. Initialiser la page veille (si on est dessus)
  initVeilleIfNeeded();
});

// -- Fonctions d'initialisation --

function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === THEME_LOL) {
    setThemeLol();
  } else if (storedTheme === THEME_MARIO) {
    setThemeMario();
  } else {
    setThemePro(); // par défaut
  }
}

function animateElements() {
  const elements = document.querySelectorAll(
    ".featured-card, .project-card, .cv-block, .contact-form, " +
    ".about-section, .call-to-action, .filter-bar, .articles-grid"
  );
  elements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 300);
  });
}

function initVeilleIfNeeded() {
  // On récupère les éléments HTML
  const container = document.getElementById("articlesContainer");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const searchBtn = document.getElementById("searchBtn");

  // Vérifier qu'on est sur la page de veille (où la variable 'articles' existe)
  if (container && searchInput && sortSelect && searchBtn && typeof articles !== "undefined") {
    function displayArticles(list) {
      container.innerHTML = "";
      list.forEach((article) => {
        container.innerHTML += `
          <div class="article-card">
            <img src="${article.image}" alt="Image de l'article">
            <h3>${article.titre}</h3>
            <p class="article-meta">
              <span class="article-date">${article.date}</span> - 
              <span class="article-source">${article.source}</span>
            </p>
            <p class="article-desc">${article.description}</p>
            <p class="article-tags">Tags : ${article.tags.join(", ")}</p>
            <a href="${article.lien}" class="btn">Plus d'infos</a>
          </div>
        `;
      });
    }

    function filterAndSortArticles() {
      const query = searchInput.value.toLowerCase();
      let filtered = articles.filter((a) => {
        return (
          a.titre.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });

      const sortValue = sortSelect.value;
      switch (sortValue) {
        case "dateDesc":
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "dateAsc":
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "titreAsc":
          filtered.sort((a, b) => a.titre.localeCompare(b.titre));
          break;
        default:
          break;
      }

      displayArticles(filtered);
    }

    searchBtn.addEventListener("click", filterAndSortArticles);
    displayArticles(articles);
  }
}

// -- Ecouteur global des touches --
document.addEventListener("keydown", (e) => {
  // Konami code
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerKonamiEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  // Saisie texte
  if (e.key.length === 1) {
    typedText += e.key;
  }
  // On limite la longueur
  if (typedText.length > 50) {
    typedText = typedText.slice(-50);
  }

  // Easter Egg "je te vois"
  if (typedText.toLowerCase().includes("je te vois")) {
    triggerSecondEgg();
    typedText = "";
  }

  // Thème LoL
  if (typedText.toLowerCase().includes("league of legends")) {
    setThemeLol();
    typedText = "";
  }

  // Thème pro
  if (typedText.toLowerCase().includes("pro")) {
    setThemePro();
    typedText = "";
  }

  // Thème mario
  if (typedText.toLowerCase().includes("mario")) {
    setThemeMario();
    typedText = "";
  }
});

// -- Fonctions Easter Egg --

function triggerKonamiEgg() {
  alert("Konami Code détecté ! À l’attaque !");
}

function triggerSecondEgg() {
  alert("Tu m'as vu... et je te vois aussi !");
}

// -- Fonctions de changement de thème --

function setThemePro() {
  document.body.classList.remove("lol-theme", "mario-theme");
  document.body.classList.add("pro-theme");
  localStorage.setItem("theme", THEME_PRO);

  // Mettre à jour le logo si présent
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = "img/logo-pro.png";
  }
}

function setThemeLol() {
  document.body.classList.remove("pro-theme", "mario-theme");
  document.body.classList.add("lol-theme");
  localStorage.setItem("theme", THEME_LOL);

  // Mettre à jour le logo
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = "img/logo-lol.png";
  }
}

function setThemeMario() {
  document.body.classList.remove("pro-theme", "lol-theme");
  document.body.classList.add("mario-theme");
  localStorage.setItem("theme", THEME_MARIO);

  // Mettre à jour le logo
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = "img/logo-mario.png";
  }
}
