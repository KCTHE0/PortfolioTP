const feedContainer = document.getElementById('rss-feed');

const RSS_URL = 'https://www.usine-digitale.fr/rss';

fetch(RSS_URL)
  .then(res => res.json())
  .then(data => {
    const articles = data.items.slice(0, 5); // Limite à 5 articles
    renderArticles(articles);
  });

function renderArticles(articles) {
  feedContainer.innerHTML = '';
  articles.forEach(item => {
    const image = item.thumbnail || 'https://cdn.pixabay.com/photo/2023/07/27/ai-artificial-intelligence-8149686_1280.jpg';
    const article = document.createElement('div');
    article.classList.add('article');
    article.innerHTML = `
      <img src="${image}" alt="Illustration article" width="100%" />
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${new Date(item.pubDate).toLocaleDateString('fr-FR')}</p>
      <p>${item.description.substring(0, 150)}...</p>
    `;
    feedContainer.appendChild(article);
  });
}
