function prettyTimeAgo(ms) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s} second${s!==1? 's':''} ago`;
  const m = Math.floor(s/60);
  if (m < 60) return `${m} minute${m!==1? 's':''} ago`;
  const h = Math.floor(m/60);
  if (h < 24) return `${h} hour${h!==1? 's':''} ago`;
  const d = Math.floor(h/24);
  return `${d} day${d!==1? 's':''} ago`;
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('visit-message');
  if (!el) return;
  const key = 'finalLastVisit';
  const last = localStorage.getItem(key);
  const now = Date.now();
  if (last) {
    const diff = now - Number(last);
    el.textContent = `Welcome back — your last visit was ${prettyTimeAgo(diff)}.`;
  } else {
    el.textContent = 'Welcome — this seems to be your first visit.';
  }
  localStorage.setItem(key, String(now));
});
