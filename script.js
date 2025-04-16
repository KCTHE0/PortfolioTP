const feedContainer = document.getElementById('rss-feed');
const searchInput = document.getElementById('searchInput');

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.gamekult.com/feed.xml';

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

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = allArticles.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.description.toLowerCase().includes(keyword)
  );
  renderArticles(filtered);
});
