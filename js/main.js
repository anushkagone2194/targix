document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(a => {
    try {
      if (a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()) {
        a.classList.add('active');
        a.style.color = '#fff';
      }
    } catch(e) { /* ignore in tests */ }
  });
});
