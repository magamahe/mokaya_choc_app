import React from 'react';
import { motion } from 'framer-motion';
import { useMokayaTheme } from '../context/ThemeContext';
import fotoPerfil from '../assets/gaby.webp'; 
import bgCacao from '../assets/bg-cacao.webp'; 

const AboutUs = () => {
  const { theme, darkMode } = useMokayaTheme();

  return (
    <section 
      id="nosotros"
      className="relative py-24 px-6 md:px-12 overflow-hidden scroll-mt-24" 
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `linear-gradient(rgba(109, 87, 14, 0.92), rgba(190, 172, 116, 0.88)), url(${bgCacao})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' 
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-24 relative z-10 items-center">
        
        {/* 1. BLOQUE TÍTULO: Primero en Mobile, Columna 2 en Desktop */}
        <div className="lg:col-start-2 lg:row-start-1 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-[2px]" style={{ backgroundColor: theme.primary }}></div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold" style={{ color: theme.primary }}>
              La Fundadora
            </span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold leading-tight" 
            style={{ 
                color: theme.text, 
                fontFamily: theme.fonts.title, 
                fontSize: theme.size.h2,
                fontWeight: 700 
            }}
          >
            Ingeniería aplicada al <span style={{ color: theme.primary }}>arte</span> del chocolate
          </motion.h2>
        </div>

        {/* 2. BLOQUE IMAGEN: Segundo en Mobile, Columna 1 en Desktop */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 flex justify-center items-center p-4">
          <div className="relative w-full max-w-[450px] aspect-[4/5]">
            
            {/* Marco decorativo */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 border-2 rounded-[60px] z-0" 
              style={{ borderColor: theme.primary }}
            ></motion.div>

            {/* Foto principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 w-full h-full"
            >
              <img 
                src={fotoPerfil} 
                alt="María Gabriela - Mokaya" 
                className="w-full h-full object-cover rounded-[50px] border-[12px] shadow-2xl"
                style={{ 
                  borderColor: darkMode ? '#1a1a1a' : '#fff',
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)' 
                }}
              />
            </motion.div>

            {/* Sello circular flotante */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 md:-right-10 w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center border backdrop-blur-xl z-20 shadow-2xl"
              style={{ 
                backgroundColor: `${theme.primary}33`, 
                borderColor: theme.primary 
              }}
            >
              <div className="text-center">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] leading-tight" style={{ color: theme.text }}>
                  Pureza &<br/>Diseño
                </p>
                <div className="w-8 h-[1px] bg-current mx-auto mt-2 opacity-30" style={{ backgroundColor: theme.text }}></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. BLOQUE TEXTO Y DETALLES: Tercero en Mobile, Columna 2 debajo del título en Desktop */}
        <div className="lg:col-start-2 lg:row-start-2 space-y-8 lg:-mt-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed opacity-80" 
            style={{ color: theme.text }}
          >
            Soy <strong className="font-bold">María Gabriela</strong>. Mi camino comenzó en la ingeniería, donde aprendí el valor de la precisión y el detalle. Con el tiempo, descubrí en el chocolate una nueva forma de crear: más sensorial, más emocional.
            Hoy fusiono ambos mundos para dar vida a piezas que no solo se ven, sino que se sienten… y se disfrutan.
          </motion.p>

          {/* Grid de Diferenciales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h5 className="font-bold text-sm uppercase tracking-widest" style={{ color: theme.primary }}>
                Precisión Técnica
              </h5>
              <p className="text-sm opacity-70 leading-relaxed" style={{ color: theme.text }}>
                Llevo la prolijidad de la ingeniería al mármol, logrando diseños coloridos que desafían los sentidos.
              </p>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold text-sm uppercase tracking-widest" style={{ color: theme.primary }}>
                Esencia Regional
              </h5>
              <p className="text-sm opacity-70 leading-relaxed" style={{ color: theme.text }}>
                Desarrollo rellenos con frutas frescas de nuestra región que conservan su alma más pura.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;