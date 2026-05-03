import React from 'react';
import { motion } from 'framer-motion'; 
import { useMokayaTheme } from '../context/ThemeContext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import bgCacao from '../assets/bg-cacao.webp'; 

const Contact = () => {
  const { theme, darkMode } = useMokayaTheme();
  
  const mensaje = encodeURIComponent("¡Hola Mokaya! Me gustaría consultar por sus bombones de autor.");
  const telefono = import.meta.env.VITE_WHATSAPP_PHONE; 
  const wspLink = `https://wa.me/${telefono}?text=${mensaje}`;

  const dripVariants = {
    animate: (i) => ({
      y: [0, 25, 0],
      scaleY: [1, 1.5, 1],
      scaleX: [1, 0.8, 1],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.8
      }
    })
  };

  return (
    <section 
  className="relative py-24 px-6 text-center overflow-hidden"
  style={{ 
    backgroundColor: theme.background,
    backgroundImage: `
      linear-gradient(rgba(243, 222, 144, 0.9), rgba(104, 81, 15, 0.85)),
      url(${bgCacao})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' 
  }}
>
      <div className="max-w-4xl mx-auto space-y-10 flex flex-col items-center">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-[2px]" style={{ backgroundColor: theme.primary }}></div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold" style={{ color: theme.primary }}>
              Tentate y contactanos
            </span>
          </div>
        <motion.h2 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-5xl md:text-6xl font-bold leading-tight"
  style={{ 
    color: theme.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.size.h2
  }}
>
  ¿Tenés un antojo <span style={{ color: theme.primary }}>especial</span>?
</motion.h2>
        
        <p 
          className="text-lg opacity-80 max-w-xl mx-auto leading-relaxed" 
          style={{ color: theme.text }}
        >
          Hacé tu pedido personalizado o consultanos por nuestras colecciones de temporada. 
        </p>

        {/* CONTENEDOR DEL EFECTO GOOEY */}
        <div className="relative py-20 flex justify-center items-center w-full">
          
          <div style={{ filter: 'url(#gooey-chocolate)' }} className="relative flex justify-center items-center">
            
            {/* BOTÓN */}
            <motion.a
              href={wspLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex items-center justify-center space-x-3 px-10 py-5 text-xl font-bold"
              style={{ 
                backgroundColor: theme.primary, 
                color: darkMode ? '#000' : '#fff', 
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
            >
              <WhatsAppIcon />
              <span>Enviar WhatsApp</span>
            </motion.a>

            {/* GOTAS */}
            <motion.div 
              custom={0}
              variants={dripVariants}
              animate="animate"
              className="absolute top-1/2 left-12 w-10 h-10 rounded-full"
              style={{ backgroundColor: theme.primary, zIndex: 10 }}
            />
            
            <motion.div 
              custom={1.5}
              variants={dripVariants}
              animate="animate"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
              style={{ backgroundColor: theme.primary, zIndex: 10 }}
            />

            <motion.div 
              custom={0.5}
              variants={dripVariants}
              animate="animate"
              className="absolute top-1/2 right-16 w-8 h-8 rounded-full"
              style={{ backgroundColor: theme.primary, zIndex: 10 }}
            />
          </div>
        </div>

        {/* FILTRO SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="gooey-chocolate">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

      </div>
    </section>
  );
};

export default Contact;