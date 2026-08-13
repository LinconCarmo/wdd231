document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('fetch-demo');
  if (!el) return;

  async function loadAnnouncements() {
    try {
      const response = await fetch('data/announce.json');
      if (!response.ok) throw new Error('Network response not ok');
      const json = await response.json();
      const announcement = json.announcements && json.announcements[0];
      if (announcement) {
        el.innerHTML = `<strong>${announcement.title}:</strong> ${announcement.text}`;
      } else {
        el.textContent = 'No announcements.';
      }
    } catch (error) {
      el.textContent = 'Failed to load announcements.';
    }
  }

  loadAnnouncements();
});
