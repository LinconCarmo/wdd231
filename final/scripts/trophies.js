import { trophies } from '../data/trophies.mjs';

const container = document.getElementById('trophies-grid');

function cardHtml(t) {
  const years = (t.notable && t.notable.length) ? `<p><strong>Notable years:</strong> ${t.notable.join(', ')}</p>` : '';
  const filename = t.image.split('/').pop();
  return `
    <article class="trophy-card">
      <figure>
        <img src="${t.image}"
             alt="${t.title}"
             loading="lazy"
             onerror="this.onerror=null; this.src='images/${filename}';">
      </figure>
      <h4>${t.title}</h4>
      <p><strong>Count:</strong> ${t.count}</p>
      ${years}
      <p>${t.description}</p>
    </article>
  `;
}

function render() {
  if (!container) return;
  container.innerHTML = trophies.map(cardHtml).join('');
}

document.addEventListener('DOMContentLoaded', render);
