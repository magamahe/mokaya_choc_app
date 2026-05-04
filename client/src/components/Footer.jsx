import React from "react";
import { HashLink } from "react-router-hash-link"; // Para que el scroll funcione
import { useMokayaTheme } from "../context/ThemeContext";

// Iconos para Redes
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Iconos para el Menú (Nuevos)
import HomeIcon from "@mui/icons-material/HomeOutlined";
import StorefrontIcon from "@mui/icons-material/StorefrontOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportIcon from "@mui/icons-material/ContactSupportOutlined";

import logoMokaya from "../assets/logo.webp";

const Footer = () => {
  const { theme, darkMode } = useMokayaTheme();

  // Definimos los links con sus iconos y rutas correspondientes
  const footerLinks = [
    { name: "Inicio", path: "/#top", icon: <HomeIcon fontSize="inherit" /> },
    {
      name: "Productos",
      path: "/#catalogo",
      icon: <StorefrontIcon fontSize="inherit" />,
    },
    {
      name: "Nosotros",
      path: "/#nosotros",
      icon: <InfoIcon fontSize="inherit" />,
    },
    {
      name: "Contacto",
      path: "/#contacto",
      icon: <ContactSupportIcon fontSize="inherit" />,
    },
  ];

  return (
    <footer
      className="pt-20 pb-10 px-6 md:px-12 transition-colors duration-300"
      style={{
        // Usamos el mismo fondo del navbar
        backgroundColor: theme.background,
        borderTop: `1px solid ${theme.primary}15`,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
        {/* COLUMNA 1: LOGO Y FILOSOFÍA */}
        <div className="space-y-6">
          <img
            src={logoMokaya}
            alt="Mokaya Logo"
            className="h-16 mx-auto md:mx-0 opacity-90"
            style={{ filter: darkMode ? "invert(1) brightness(1.5)" : "none" }}
          />
          <p
            className="text-sm leading-relaxed italic font-light"
            style={{ color: theme.text, opacity: 0.7 }}
          >
            "Creamos experiencias sensoriales a través del cacao de origen. Cada
            pieza es una obra de arte diseñada para quienes aprecian el
            detalle."
          </p>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN CON ICONOS */}
        <div className="space-y-6">
          <h4
            className="uppercase tracking-[0.3em] text-[10px] font-bold"
            style={{ color: theme.primary }}
          >
            Explorar
          </h4>
          <ul className="space-y-4">
            {footerLinks.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-center md:justify-start gap-3"
              >
                <span style={{ color: theme.primary, fontSize: "16px" }}>
                  {item.icon}
                </span>
                <HashLink
                  smooth
                  to={item.path}
                  className="text-xs uppercase tracking-widest hover:opacity-50 transition-all"
                  style={{ color: theme.text }}
                >
                  {item.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 3: SOCIAL & UBICACIÓN */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4
              className="uppercase tracking-[0.3em] text-[10px] font-bold"
              style={{ color: theme.primary }}
            >
              Seguinos
            </h4>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://www.instagram.com/mokaya_choc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                style={{ color: theme.primary }}
              >
                <InstagramIcon fontSize="small" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/magamahe"
                target="_blank"
                rel="noopener noreferrer"
                title="Mi LinkedIn"
                className="hover:scale-110 transition-transform"
                style={{ color: theme.primary }}
              >
                <LinkedInIcon fontSize="small" />
              </a>
            </div>
          </div>

          <div
            className="space-y-2 text-xs tracking-wide opacity-60"
            style={{ color: theme.text }}
          >
            <p className="font-bold" style={{ color: theme.primary }}>
              San Rafael, Mendoza
            </p>
            <p>magamahe@gmail.com</p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT FINAL */}
      <div
        className="max-w-7xl mx-auto mt-20 pt-8 border-t flex flex-col justify-center items-center text-[9px] uppercase tracking-[0.3em] opacity-30"
        style={{ borderColor: `${theme.primary}15`, color: theme.text }}
      >
        <p>
          © 2026 MOKAYA CHOCOLATERÍA DE AUTOR. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
