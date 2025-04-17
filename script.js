const feedContainer = document.getElementById('rss-feed');

// Flux RSS d’ActuIA
const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.actuia.com/feed/';

fetch(RSS_URL)
  .then(res => res.json())
  .then(data => {
    const articles = data.items.slice(0, 3); // Limite à 3 articles récents
    renderArticles(articles, data.feed);
  });

function renderArticles(articles, feed) {
  feedContainer.innerHTML = '';
  articles.forEach(item => {
    const article = document.createElement('div');
    article.classList.add('article-card');

    let imageUrl = '';

    // 1. Si y'a une image dans 'enclosure'
    if (feed.title !== "TechCrunch" && item.enclosure && item.enclosure.link) {
      imageUrl = item.enclosure.link;
    }

    // 2. Sinon, on cherche une balise <img> dans la description
    else if (feed.title !== "TechCrunch" && item.description) {
      const contentDoc = new DOMParser().parseFromString(item.description, 'text/html');
      const img = contentDoc.querySelector('img');
      if (img && img.src) {
        imageUrl = img.src;
      }
    }

    // 3. Si aucune image trouvée => image par défaut
    if (!imageUrl || imageUrl === '') {
      imageUrl = "https://via.placeholder.com/150?text=Pas+d'image";
    }

    article.innerHTML = `
      <img src="${imageUrl}" alt="Illustration article" class="article-image" />
      <div class="article-content">
        <a href="${item.link}" class="article-title" target="_blank">${item.title}</a>
        <p class="article-date">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</p>
      </div>
    `;

    feedContainer.appendChild(article);
  });
}
