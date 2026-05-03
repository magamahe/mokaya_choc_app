import React from "react";
import { Button } from "@mui/material";
import { useMokayaTheme } from "../context/ThemeContext";

// Importamos las 5 fotos
import fotoBombones from "../assets/Bombones.webp";
import fotoConejo from "../assets/conejo.webp";
import fotoTrufas from "../assets/trufas.webp";
import fotoTableta from "../assets/tableta.webp";

const AboutProducts = () => {
  const { theme, darkMode } = useMokayaTheme();

  return (
    <section
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-[2px]"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <span
              className="uppercase tracking-[0.3em] text-xs font-bold"
              style={{ color: theme.primary }}
            >
              Colección de Autor
            </span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold leading-tight"
            style={{
              color: theme.text,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Explosión de <span style={{ color: theme.primary }}>color</span> y
            sabor único
          </h2>

          <p
            className="text-lg leading-relaxed opacity-80"
            style={{ color: theme.text }}
          >
            En Mokaya, cada bombón es una pieza de diseño. Utilizamos cacao
            seleccionado y técnicas de pintura artesanal para crear piezas que
            no solo deleitan el paladar, sino que cuentan una historia en cada
            bocado.
          </p>

          <div className="flex space-x-4 pt-4">
            {/* <Button variant="contained" 
              style={{ backgroundColor: theme.primary, color: darkMode ? '#000' : '#fff', borderRadius: '50px', padding: '12px 30px', textTransform: 'none', fontWeight: 'bold' }}>
              Visitar Tienda
            </Button> */}
            <Button
              variant="text"
              style={{
                color: theme.text,
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => {
                const section = document.getElementById("catalogo");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver Catálogo →
            </Button>
          </div>
        </div>

        {/* COLUMNA DERECHA: COLLAGE ARTÍSTICO DE 5 FOTOS */}
        {/* Usamos un grid de 3 columnas para mayor flexibilidad */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 aspect-square h-full min-h-[500px]">
          {/* Foto 1: Grande (Ocupa 2x2 arriba izquierda) */}
          <div className="col-span-2 row-span-2 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <img
              src={fotoTableta}
              alt="Tableta"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foto 2: Vertical (Ocupa 1 col, 2 rows derecha) */}
          <div className="col-span-1 row-span-2 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <img
              src={fotoConejo}
              alt="Conejo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foto 3: Pequeña (1x1 abajo izquierda) */}
          <div className="col-span-1 row-span-1 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <img
              src={fotoTrufas}
              alt="Trufas"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foto 4: Horizontal (2x1 abajo centro/derecha) */}
          <div className="col-span-2 row-span-1 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <img
              src={fotoBombones}
              alt="Bombones"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProducts;
