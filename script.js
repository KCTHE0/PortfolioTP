const feedContainer = document.getElementById('rss-feed');
const searchInput = document.getElementById('searchInput');

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://venturebeat.com/category/ai/feed/';

let allArticles = [];

fetch(RSS_URL)
  .then(res => res.json())
  .then(data => {
    allArticles = data.items;
    renderArticles(allArticles);
  });

function renderArticles(articles) {
  feedContainer.innerHTML = '';
  articles.forEach(item => {
    const article = document.createElement('div');
    article.classList.add('article');
    article.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${new Date(item.pubDate).toLocaleDateString('fr-FR')}</p>
      <p>${item.description.substring(0, 150)}...</p>
    `;
    feedContainer.appendChild(article);
  });
}

// Recherche dynamique
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = allArticles.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.description.toLowerCase().includes(keyword)
  );
  renderArticles(filtered);
});
