const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.jeuxvideo.com/rss/rss.xml';

fetch(rssUrl)
  .then(response => response.json())
  .then(data => {
    const feedContainer = document.getElementById('rss-feed');
    const searchInput = document.getElementById('searchInput');

    function displayArticles(articles) {
      feedContainer.innerHTML = '';
      articles.forEach(item => {
        const article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
          <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
          <p>${item.pubDate}</p>
          <p>${item.description}</p>
        `;
        feedContainer.appendChild(article);
      });
    }

    let articles = data.items;
    displayArticles(articles);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = articles.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
      displayArticles(filtered);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du flux RSS:', error);
  });
