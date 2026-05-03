import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMokayaTheme } from '../context/ThemeContext';

const SECRETS_DATA = [
  { titulo: "– Emily Luchetti –", dato: "“Después de comer chocolate te sientes como un dios, como si pudieras conquistar a los enemigos, liderar ejércitos y atraer a los amantes.”" },
  { titulo: "– Anónimo –", dato: "“Dame de tu vitamina A, B y C: abrazos, besos y chocolate.”" },
  { titulo: "– John Q. Tulio –", dato: "“A nueve de cada diez personas les gusta el chocolate. La décima persona siempre miente.”" }
];

const ChocolateSecrets = () => {
  const { theme, darkMode } = useMokayaTheme();
  const [fact, setFact] = useState(null);

  const rectRef = useRef(null);
  const [dash, setDash] = useState(2000);

  useEffect(() => {
    setFact(SECRETS_DATA[Math.floor(Math.random() * SECRETS_DATA.length)]);
  }, []);

  // aproximación del perímetro del rect (evita cortes)
  useEffect(() => {
    const width = rectRef.current?.getBBox?.().width || 1000;
    const height = rectRef.current?.getBBox?.().height || 600;
    const radius = 48; // aprox 3rem

    const perimeter =
      2 * (width + height - 4 * radius) + 2 * Math.PI * radius;

    setDash(perimeter || 2000);
  }, []);

  if (!fact) return null;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.background }}>
      <div className="max-w-3xl mx-auto relative pt-10">

        {/* SELLO */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: -17 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className="absolute top-12 -left-6 z-30 bg-[#d32f2f] text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-2xl border-2 border-white"
        >
          Mokaya Secret
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative p-12 md:p-16 rounded-[3rem] overflow-hidden"
          style={{
            backgroundColor: darkMode ? '#15100e' : '#1c1512',
            boxShadow: '20px 20px 60px rgba(0,0,0,0.3)'
          }}
        >

          {/* BORDER ANIMADO */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              filter: `drop-shadow(0 0 10px ${theme.primary})`
            }}
          >
            <motion.rect
              ref={rectRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="48"
              fill="transparent"
              stroke={theme.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={dash}
              initial={{ strokeDashoffset: dash }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* CONTENIDO */}
          <div className="relative z-10 flex flex-col items-center text-center">

            <div
              className="w-12 h-[1px] mb-10"
              style={{ backgroundColor: theme.primary }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={fact.dato}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p
                  className="text-2xl md:text-3xl font-light italic leading-relaxed text-white mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {fact.dato}
                </p>

                <h4
                  className="uppercase tracking-[0.5em] text-[10px] font-bold opacity-40"
                  style={{ color: theme.primary }}
                >
                  {fact.titulo}
                </h4>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* glow interior */}
          <div
            className="absolute -bottom-10 -right-10 w-40 h-40 blur-[100px] opacity-20 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ChocolateSecrets;