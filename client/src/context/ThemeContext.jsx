import React, { createContext, useState, useContext } from 'react';
import { mokayaTheme } from '../theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

 // Elegimos el set de colores según el modo
  const currentColors = darkMode 
    ? mokayaTheme.colors.dark 
    : mokayaTheme.colors.light;

  // Theme completo
  const theme = {
    ...currentColors,
    fonts: mokayaTheme.fonts,
    size: mokayaTheme.size,
    shadows: mokayaTheme.shadows,
    radius: mokayaTheme.radius,
    spacing: mokayaTheme.spacing
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      <div 
        style={{ 
          backgroundColor: theme.background, 
          color: theme.text, 
          minHeight: '100vh',
          transition: 'background-color 0.3s ease',
          fontFamily: theme.fonts.body // 👈 fuente base global
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Hook personalizado
export const useMokayaTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useMokayaTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};