const button = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-navigation');

if (button && nav) {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.target === button || nav.contains(event.target)) return;
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  });
}
