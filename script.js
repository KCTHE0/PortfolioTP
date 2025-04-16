const feedContainer = document.getElementById('rss-feed');
const searchInput = document.getElementById('searchInput');

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.usine-digitale.fr/rss';

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
    const image = item.enclosure?.link || 'https://via.placeholder.com/600x300?text=Pas+de+visuel';
    
    const article = document.createElement('div');
    article.classList.add('article');
    article.innerHTML = `
      <img src="${image}" alt="Illustration article">
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
