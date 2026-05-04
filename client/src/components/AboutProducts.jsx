import React from "react";
import { Button } from "@mui/material";
import { useMokayaTheme } from "../context/ThemeContext";

// Fotos
import fotoBombones from "../assets/Bombones.webp";
import fotoConejo from "../assets/conejo.webp";
import fotoTrufas from "../assets/trufas.webp";
import fotoTableta from "../assets/tableta.webp";

const AboutProducts = () => {
  const { theme } = useMokayaTheme();

  return (
    <section
      className="py-20 px-4 md:px-12 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* TEXTO */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-[2px]"
              style={{ backgroundColor: theme.primary }}
            />
            <span
              className="uppercase tracking-[0.3em] text-xs font-bold"
              style={{ color: theme.primary }}
            >
              Colección de Autor
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{
              color: theme.text,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Explosión de <span style={{ color: theme.primary }}>color</span> y
            sabor único
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed opacity-80"
            style={{ color: theme.text }}
          >
            En Mokaya, cada bombón es una pieza de diseño. Utilizamos cacao
            seleccionado y técnicas de pintura artesanal para crear piezas que
            no solo deleitan el paladar, sino que cuentan una historia en cada
            bocado.
          </p>

          <div className="flex space-x-4 pt-4">
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

        {/* COLLAGE PREMIUM */}
        <div className="w-full flex justify-center">
          {/* TARJETA MOBILE + CONTENEDOR DESKTOP */}
          <div
            className="
  w-full
  md:max-w-none
  bg-transparent
  p-0
"
          >
            {/* GRID */}
            <div
              className="
              grid
              grid-cols-3
              grid-rows-3
              gap-2 md:gap-3
              aspect-square
              md:min-h-[500px]
            "
            >
              {/* GRANDE */}
              <div className="col-span-2 row-span-2 rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-lg transition-transform duration-500 md:hover:scale-[1.02]">
                <img
                  src={fotoTableta}
                  alt="Tableta"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* VERTICAL */}
              <div className="col-span-1 row-span-2 rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-lg transition-transform duration-500 md:hover:scale-[1.02]">
                <img
                  src={fotoConejo}
                  alt="Conejo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* PEQUEÑA */}
              <div className="col-span-1 row-span-1 rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-lg transition-transform duration-500 md:hover:scale-[1.02]">
                <img
                  src={fotoTrufas}
                  alt="Trufas"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* HORIZONTAL */}
              <div className="col-span-2 row-span-1 rounded-[16px] md:rounded-[30px] overflow-hidden shadow-md md:shadow-lg transition-transform duration-500 md:hover:scale-[1.02]">
                <img
                  src={fotoBombones}
                  alt="Bombones"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutProducts;