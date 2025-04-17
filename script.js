const feedContainer = document.getElementById('rss-feed');

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.buzzsprout.com/598612.rss';

fetch(RSS_URL)
  .then(res => res.json())
  .then(data => {
    renderArticles(data.items);
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
