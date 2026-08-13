import { legends } from '../data/legends.mjs';

const grid = document.getElementById('legends-grid');

function renderLegends(items) {
  // use map to build HTML and template literals
  const html = items.map((item, i) => {
    const filename = item.image.split('/').pop();
    return `
      <article class="legend-card">
        <figure>
          <img src="${item.image}"
               alt="Photo of ${item.name}"
               loading="lazy"
               onerror="this.onerror=null; this.src='images/${filename}';">
        </figure>
        <h3>${item.name}</h3>
        <p><strong>Position:</strong> ${item.position}</p>
        <p><strong>Years:</strong> ${item.years}</p>
        <p>${item.description}</p>
      </article>
    `;
  }).join('');

  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  if (grid) renderLegends(legends);
});
