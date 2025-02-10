// script.js

// Variables globales pour l'input texte
let typedText = "";

// Au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("Site chargé en mode Pro !");

  // 1. Animation simple d’apparition (optionnel)
  const elements = document.querySelectorAll(
    ".featured-card, .project-card, .cv-block, .contact-form, " +
    ".about-section, .call-to-action, .filter-bar, .articles-grid"
  );
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 300);
  });

  // 2. Système de recherche / tri pour la veille (uniquement sur veille.html)
  const container = document.getElementById("articlesContainer");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const searchBtn = document.getElementById("searchBtn");

  // On vérifie qu'on est bien sur la page veille (où 'articles' est défini dans data.js)
  if (container && searchInput && sortSelect && searchBtn && typeof articles !== 'undefined') {
    
    function displayArticles(list) {
      container.innerHTML = "";
      list.forEach(article => {
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
      let filtered = articles.filter(a => {
        return (
          a.titre.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags.some(tag => tag.toLowerCase().includes(query))
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

    // Événement sur le bouton Recherche
    searchBtn.addEventListener("click", filterAndSortArticles);
    // Affichage initial
    displayArticles(articles);
  }

  // 3. Konami Code
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    // Vérif Konami Code
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerKonamiEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }

    // 4. Accumulation des touches pour "je te vois" et "league of legends"
    if (e.key.length === 1) {
      typedText += e.key; 
    }
    // On limite la longueur pour éviter d'accumuler trop
    if (typedText.length > 50) {
      typedText = typedText.slice(-50);
    }

    // Easter Egg "je te vois"
    if (typedText.toLowerCase().includes("je te vois")) {
      triggerSecondEgg();
      typedText = "";
    }

    // Passage en thème LoL quand on tape "league of legends"
    if (typedText.toLowerCase().includes("league of legends")) {
      activateLolTheme();
      typedText = "";
    }
  });
});

// -- Fonctions d'Easter Egg / Thème --

function triggerKonamiEgg() {
  alert("Konami Code détecté ! À l’attaque !");
}

function triggerSecondEgg() {
  alert("Tu m'as vu... et je te vois aussi !");
}

function activateLolTheme() {
  console.log("Passage en thème LoL !");
  // On enlève la classe pro-theme
  document.body.classList.remove("pro-theme");
  // On ajoute la classe lol-theme
  document.body.classList.add("lol-theme");
}

