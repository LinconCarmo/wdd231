import { discoverItems } from '../data/discover.mjs';

const grid = document.getElementById('discover-grid');
const visitMessage = document.getElementById('visit-message');

function buildCards(items) {
  const areaNames = [
    'area1','area2','area3','area4','area5','area6','area7','area8'
  ];

  items.forEach((item, i) => {
    const article = document.createElement('article');
    article.className = `discover-card ${areaNames[i]}`;
    const detailId = `details-${i + 1}`;

    article.innerHTML = `
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <h2>${item.name}</h2>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <div id="${detailId}" class="expandable" hidden>
        <p>${item.description}</p>
      </div>
      <button type="button" class="learn-more" aria-expanded="false" aria-controls="${detailId}" aria-label="Learn more about ${item.name}">Learn More</button>
    `;

    grid.appendChild(article);

    // add expand/collapse behavior
    const btn = article.querySelector('.learn-more');
    const details = article.querySelector('.expandable');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        details.hidden = true;
        btn.textContent = 'Learn More';
        article.classList.remove('expanded');
      } else {
        details.hidden = false;
        btn.textContent = 'Show Less';
        article.classList.add('expanded');
      }
    });
  });
}

function showVisitMessage() {
  const key = 'discover-last-visit';
  const now = Date.now();
  const last = localStorage.getItem(key);

  if (!last) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const days = Math.floor((now - parseInt(last, 10)) / msPerDay);

    if (days < 1) {
      visitMessage.textContent = 'Back so soon! Awesome!';
    } else if (days === 1) {
      visitMessage.textContent = 'You last visited 1 day ago.';
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem(key, now.toString());
}

document.addEventListener('DOMContentLoaded', () => {
  if (grid) buildCards(discoverItems);
  if (visitMessage) showVisitMessage();
});
