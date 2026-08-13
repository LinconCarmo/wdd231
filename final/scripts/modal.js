function trapFocus(container) {
  const focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function onKey(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    if (e.key === 'Escape') {
      close();
    }
  }
  container.addEventListener('keydown', onKey);
  return () => container.removeEventListener('keydown', onKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const open = document.getElementById('open-modal');
  const modal = document.getElementById('site-modal');
  if (!open || !modal) return;
  const overlay = modal.querySelector('[data-close]');
  const closeButtons = modal.querySelectorAll('[data-close]');
  let restoreFocus = null;

  function openModal() {
    restoreFocus = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
    const remover = trapFocus(modal);
    // focus first focusable
    const first = modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
    modal._removeTrap = remover;
  }

  function close() {
    if (modal._removeTrap) modal._removeTrap();
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    if (restoreFocus) restoreFocus.focus();
  }

  open.addEventListener('click', openModal);
  overlay.addEventListener('click', close);
  closeButtons.forEach(b => b.addEventListener('click', close));
});
