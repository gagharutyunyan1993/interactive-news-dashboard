export function initNews() {
    fetch('https://api.spaceflightnewsapi.net/v4/articles')
        .then(response => response.json())
        .then(data => {
            const articles = data.results;
            if (!articles || articles.length === 0) {
                console.warn('Нет новостей, полученных из API.');
                return;
            }

            const bannerArticle = articles[0];
            const bannerTitleElement = document.querySelector('.news__banner-title');
            if (bannerTitleElement) {
                bannerTitleElement.textContent = bannerArticle.title;
            }

            const bannerImg = document.querySelector('.news__banner-img');
            if (bannerImg && bannerArticle.image_url) {
                bannerImg.src = bannerArticle.image_url;
            }

            const newsList = document.querySelector('.news__list');
            if (newsList) {
                newsList.innerHTML = '';
                articles.slice(1, 5).forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news__item';
                    newsItem.innerHTML = `
            <a href="${article.url}" class="news__item-title" target="_blank">${article.title}</a>
            <p class="news__item-text">${article.summary || ''}</p>
            <div class="news__item-info">
              <span>${new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ago</span>
              <span>${article.newsSite || 'News'}</span>
            </div>
          `;
                    newsList.appendChild(newsItem);
                });
            }

            const latestList = document.querySelector('.latest__list');
            if (latestList) {
                latestList.innerHTML = '';
                articles.slice(5, 10).forEach((article, index) => {
                    const latestNews = document.createElement('div');
                    latestNews.className = 'latest-news';

                    if (index >= 3) {
                        latestNews.setAttribute('data-news-hidden', '');
                    }
                    latestNews.innerHTML = `
            <div class="latest-news__image">
              <a href="${article.url}" target="_blank">
                <img src="${article.image_url}" alt="${article.title}" class="latest-news__image-pic">
              </a>
            </div>
            <a href="${article.url}" class="latest-news__title" target="_blank">${article.title}</a>
            <p class="latest-news__text">${article.summary || ''}</p>
            <div class="latest-news__info">
              <span>${new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ago</span>
              <span>${article.newsSite || 'News'}</span>
            </div>
          `;
                    latestList.appendChild(latestNews);
                });
            }

            const showMoreButton = document.querySelector('[data-show-more]');
            if (showMoreButton) {
                showMoreButton.addEventListener('click', () => {
                    const hiddenNewsElements = document.querySelectorAll('[data-news-hidden]');
                    hiddenNewsElements.forEach(el => el.removeAttribute('data-news-hidden'));
                    showMoreButton.remove();
                });
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки новостей:', error);
        });
}
