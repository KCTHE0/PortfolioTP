const feedContainer = document.getElementById('rss-feed');

    // Flux RSS d’ActuIA
    const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.actuia.com/feed/';

    fetch(RSS_URL)
      .then(res => res.json())
      .then(data => {
        const articles = data.items.slice(0, 3); // Limite à 12 articles récents
        renderArticles(articles);
      });

    function renderArticles(articles) {
      feedContainer.innerHTML = '';
      articles.forEach(item => {
        const article = document.createElement('div');
        article.classList.add('article-card');

        const imageURL = item.thumbnail || 'https://cdn.pixabay.com/photo/2023/07/27/ai-artificial-intelligence-8149686_1280.jpg';

        article.innerHTML = `
          <img src="${imageURL}" alt="Illustration article" class="article-image" />
          <div class="article-content">
            <a href="${item.link}" class="article-title" target="_blank">${item.title}</a>
            <p class="article-date">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</p>
          </div>
        `;
        feedContainer.appendChild(article);
      });
    }