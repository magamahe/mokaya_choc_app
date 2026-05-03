import React from 'react';
import { Button } from '@mui/material';
import { useMokayaTheme } from '../context/ThemeContext';
import heroBackground from '../assets/hero.webp';

const Hero = () => {
  const { theme, darkMode } = useMokayaTheme();

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo - Elegí una de bombones de autor */}
      <div className="absolute inset-0 z-0">
        <img 
          // 2. Usamos la variable importada aquí
          src={heroBackground} 
          alt="Mokaya Chocolates de Autor" 
          className="w-full h-full object-cover"
        />
         Capa de superposición para que el texto se lea bien (Ajustamos opacidad) 
         <div 
          className="absolute inset-0" 
          style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(75,54,33,0.4)' }}
        ></div> 
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter" 
            style={{ color: theme.primary, fontFamily: "'Playfair Display', serif" }}>
          MOKAYA
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto italic font-light" 
           style={{ color: '#fff' }}>
          "El arte de transformar el cacao en una experiencia inolvidable."
        </p> 
         <Button 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: theme.primary, 
            color: darkMode ? '#000' : '#fff',
            borderRadius: '50px',
            px: 8,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: theme.primary, opacity: 0.9 }
          }}
        >
          Ver Catálogo
        </Button>
      </div>
    </section>
  );
};

export default Hero;