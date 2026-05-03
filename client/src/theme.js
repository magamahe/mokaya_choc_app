export const mokayaTheme = {
  colors: {
    // 🌞 MODO CLARO
    light: {
      background: '#FDF5E6', // crema
      text: '#4B3621',       // café profundo
      primary: '#8B4513',    // chocolate
      secondary: '#D2B48C',  // canela suave
      accent: '#E6BE8A',     // dorado claro
      card: '#FFFFFF',
    },

    // 🌙 MODO OSCURO
    dark: {
      background: '#070403', // marrón oscuro
      text: '#F5F5DC',       // beige claro
      primary: '#D2691E',    // chocolate vibrante
      secondary: '#5C4033',  
      accent: '#C5A059',     // dorado metálico
      card: '#2A1B15',
    }
  },

  // ✨ TIPOGRAFÍA
 fonts: {
  title: "'Playfair Display', serif",
  titleBold: "'Playfair Display', serif",
  body: "'Montserrat', sans-serif",
},

  // 📏 TAMAÑOS RESPONSIVOS
  size: {
    h1: 'clamp(2.5rem, 5vw, 4rem)',
    h2: 'clamp(2rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2.2rem)',
    body: '1rem',
    small: '0.875rem'
  },

  // 🔲 BORDES (opcional pero PRO)
  radius: {
    sm: '8px',
    md: '16px',
    lg: '30px',
    xl: '60px'
  },

  // 🌫️ SOMBRAS (look premium)
  shadows: {
    soft: '0 10px 30px rgba(0,0,0,0.1)',
    medium: '0 20px 50px rgba(0,0,0,0.2)',
    strong: '0 30px 80px rgba(0,0,0,0.3)'
  },

  // 📐 ESPACIADOS (para mantener consistencia)
  spacing: {
    section: '6rem',
    container: '1.5rem'
  }
};