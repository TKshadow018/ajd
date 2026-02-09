import React, { useState, useEffect } from 'react';
import { THEMES, applyTheme, getSavedTheme } from '../utils';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = getSavedTheme();
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="theme-selector">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          className={`theme-btn ${theme.class} ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => handleThemeChange(theme.id)}
          title={theme.name}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
