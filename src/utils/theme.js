/**
 * Theme management utilities
 */

/**
 * Applies a theme to the document
 * @param {string} theme - Theme ID to apply
 */
export const applyTheme = (theme) => {
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('theme', theme);
};

/**
 * Gets the currently saved theme from localStorage
 * @returns {string} - The saved theme ID or 'default'
 */
export const getSavedTheme = () => {
  return localStorage.getItem('theme') || 'default';
};
