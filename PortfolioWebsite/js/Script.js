console.log("Portfolio loaded successfully");

// grab the toggle button
const toggleBtn = document.getElementById("theme-toggle");
if (!toggleBtn) {
  console.warn("Theme toggle button not found (#theme-toggle).");
} else {
  // helper to update UI and ARIA
  function applyTheme(isLight) {
    document.body.classList.toggle('light-mode', isLight);
    toggleBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    // if you prefer the button to show the current theme instead of the action,
    // swap the textContent assignment above.
    toggleBtn.setAttribute('aria-pressed', String(isLight));
  }

  // load persisted theme (default: dark)
  const saved = localStorage.getItem('site-theme'); // "light" or "dark"
  const isLight = saved === 'light';
  applyTheme(isLight);

  // attach click listener (no trailing space in event name)
  toggleBtn.addEventListener('click', () => {
    const nowIsLight = !document.body.classList.contains('light-mode');
    applyTheme(nowIsLight);

    // persist
    localStorage.setItem('site-theme', nowIsLight ? 'light' : 'dark');
  });
}