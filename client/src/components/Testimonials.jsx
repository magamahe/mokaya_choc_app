import React from 'react';
import { motion } from 'framer-motion';
import { useMokayaTheme } from '../context/ThemeContext';

const Testimonials = () => {
  const { theme } = useMokayaTheme();

  const reviews = [
    { text: "Bombones de Malbec increíbles.", author: "María G." },
    { text: "Presentación impecable, sabor único.", author: "Lucas R." },
    { text: "¡Los más ricos del mundo!", author: "Valentina M." },
    { text: "Una experiencia gourmet única.", author: "Sofía L." },
    { text: "Arte en cada bocado.", author: "Tomás V." },
  ];

  // Duplicamos para que el loop no tenga fin
  const doubleReviews = [...reviews, ...reviews];

  return (
    /* 1. Contenedor de altura cero para que flote entre las secciones */
    /* 2. overflow-x-clip es CLAVE para que no se salga de la pantalla por los costados */
    <div className="relative h-0 z-50 w-full overflow-x-clip">
      
      {/* LA CINTA */}
      <div
        className="absolute left-1/2 top-0 w-[200%] h-[50px] md:h-[60px] flex items-center shadow-2xl border-y"
        style={{
          // Centramos y rotamos sutilmente
          transform: "translate(-50%, -50%) rotate(-2deg)",
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent || theme.primary})`,
          borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          // Animamos del 0 al -50% porque duplicamos el array
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // Velocidad elegante
            repeat: Infinity
          }}
        >
          {doubleReviews.map((item, i) => (
            <span
              key={i}
              className="mx-12 text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center font-medium"
              style={{
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              <span className="mr-6 opacity-60">✦</span> 
              {item.text} <span className="mx-3 opacity-40">—</span> {item.author}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;