import React from "react";
import { Button } from "@mui/material";
import { useMokayaTheme } from "../context/ThemeContext";
import heroBackground from "../assets/hero.webp";

const Hero = () => {
  const { theme } = useMokayaTheme();

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Mokaya Chocolates de Autor"
          className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_linear_infinite]"
        />

        {/* OVERLAY PREMIUM (DEGRADADO) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center px-4">
        
        <h1
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          style={{
            color: theme.primary,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          MOKAYA
        </h1>

        <p
          className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          style={{ color: "#fff" }}
        >
          El arte de transformar el cacao en una experiencia inolvidable.
        </p>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.primary,
            color: "#fff",
            borderRadius: "50px",
            px: 8,
            py: 2,
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.primary,
              transform: "scale(1.05)",
            },
          }}
          onClick={() => {
            const section = document.getElementById("catalogo");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ver Catálogo
        </Button>

      </div>
    </section>
  );
};

export default Hero;