import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Contextos
import { useMokayaTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

// Componentes Críticos (Carga inmediata)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// OPTIMIZACIÓN: Carga Perezosa
const Hero = lazy(() => import("./components/Hero"));
const AboutProducts = lazy(() => import("./components/AboutProducts"));
const Catalog = lazy(() => import("./components/Catalog"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Features = lazy(() => import("./components/Features"));
const Contact = lazy(() => import("./components/Contact"));
const ChocolateSecrets = lazy(() => import("./components/ChocolateSecrets"));

// Páginas
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const MyOrders = lazy(() => import("./pages/MyOrders"));

// COMPONENTE DE LA PÁGINA DE INICIO
const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Esta función busca los elementos ".reveal" incluso si tardan en cargar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Intentar observar elementos ahora y re-intentar en 1 segundo por si el lazy loading tarda
    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timeout = setTimeout(observeElements, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="w-full" ref={containerRef}>
      <section id="top"><Hero /></section>
      <section id="productos" className="reveal"><AboutProducts /></section>
      <section id="secretos" className="reveal"><ChocolateSecrets /></section>
      <section id="catalogo" className="reveal"><Catalog /></section>
      <section id="nosotros" className="reveal"><AboutUs /></section>
      <section id="features" className="reveal"><Features /></section>
      <section id="contacto" className="reveal"><Contact /></section>
      <section id="testimonios" className="reveal"><Testimonials /></section>
    </main>
  );
};

function App() {
  const { theme } = useMokayaTheme();
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* CSS INTEGRADO PARA EVITAR PANTALLA NEGRA */}
      <style>{`
        section[id] { scroll-margin-top: 100px; }
        
        /* Los elementos ocultos empiezan aquí */
        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: opacity 1s ease-out, transform 1s ease-out; 
          will-change: opacity, transform; 
        }
        
        /* Cuando el observador los detecta, se hacen visibles */
        .reveal.active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        /* Fallback: si por alguna razón la JS falla, que se vean igual tras 3 segundos */
        @keyframes forceShow {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ 
        backgroundColor: theme?.background || "#FAF9F6", 
        color: theme?.text || "#000",
        minHeight: "100vh" 
      }}>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Fallback de carga más amigable que una pantalla negra */}
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-black text-white">
            <p className="animate-pulse">Cargando Mokaya...</p>
          </div>
        }>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin" 
              element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/mis-pedidos" 
              element={user ? <MyOrders /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;