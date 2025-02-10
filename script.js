// script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Site chargé en mode Pro !");

  // 1. Animation simple d’apparition (optionnel)
  const elements = document.querySelectorAll(".featured-card, .project-card, .cv-block, .contact-form, .about-section, .call-to-action, .filter-bar, .articles-grid");
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

  if (container && searchInput && sortSelect && searchBtn && typeof articles !== 'undefined') {
    // On est sur veille.html et la variable 'articles' existe

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
      switch(sortValue) {
        case "dateDesc":
          filtered.sort((a,b) => new Date(b.date) - new Date(a.date));
          break;
        case "dateAsc":
          filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
          break;
        case "titreAsc":
          filtered.sort((a,b) => a.titre.localeCompare(b.titre));
          break;
        default:
          break;
      }

      displayArticles(filtered);
    }

    searchBtn.addEventListener("click", filterAndSortArticles);

    // Affichage initial
    displayArticles(articles);
  }

  // 3. Changement de thème quand l’utilisateur tape "league of legends"
  let typedText = "";
  document.addEventListener("keydown", (e) => {
    // On ajoute la touche uniquement si c'est un caractère "normal"
    if (e.key.length === 1) {
      typedText += e.key;
    }
    
    // Pour éviter d'accumuler trop
    if (typedText.length > 30) {
      typedText = typedText.slice(-30);
    }

    // Vérifier si typedText contient "league of legends" (insensible à la casse)
    if (typedText.toLowerCase().includes("league of legends")) {
      activateLolTheme();
      typedText = "";
    }
  });
});

// Fonction qui active le thème LoL avec transition
function activateLolTheme() {
  console.log("Passage en thème LoL !");
  // On ajoute la classe "lol-theme" à <body> (ou <html>) et on supprime "pro-theme"
  document.body.classList.remove("pro-theme");
  document.body.classList.add("lol-theme");
}

