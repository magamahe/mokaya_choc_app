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
import Catalog from "./components/Catalog";
const AboutUs = lazy(() => import("./components/AboutUs"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Features = lazy(() => import("./components/Features"));
const Contact = lazy(() => import("./components/Contact"));
const ChocolateSecrets = lazy(() => import("./components/ChocolateSecrets"));
const AsistenteMokaya = lazy(() => import("./components/AsistenteMokaya"));
// Páginas
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const MyOrders = lazy(() => import("./pages/MyOrders"));

// COMPONENTE DE LA PÁGINA DE INICIO
const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Detectamos si entra o si ya pasamos (hacia arriba)
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("active");
          }
        });
      },
      { 
        threshold: 0.01,
        rootMargin: "0px 0px -50px 0px" // Se activa un poco antes de salir de pantalla
      }
    );

    // Buscamos todos los div con la clase reveal
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full" ref={containerRef}>
      {/* El Hero usualmente no lleva reveal para que se vea apenas carga la web */}
      <section id="top">
        <Hero />
      </section>
      
      <section id="productos">
        <div className="reveal">
          <AboutProducts />
        </div>
      </section>

      <section id="secretos">
        <div className="reveal">
          <ChocolateSecrets />
        </div>
      </section>

      <section id="catalogo">
        <div className="reveal">
          <Catalog />
        </div>
      </section>

      <section id="sommelier">
        <div className="reveal">
          <AsistenteMokaya />
        </div>
      </section>
      
      <section id="nosotros">
        <div className="reveal">
          <AboutUs />
        </div>
      </section>

      <section id="features">
        <div className="reveal">
          <Features />
        </div>
      </section>

      <section id="contacto">
        <div className="reveal">
          <Contact />
        </div>
      </section>

      <section id="testimonios">
        <div className="reveal">
          <Testimonials />
        </div>
      </section>
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
  /* Ajuste de margen para que el título no quede debajo de la Navbar */
  /* En mobile suele medir unos 60-70px, en desktop unos 90-100px */
  section[id] { 
    scroll-margin-top: 70px; 
  }

  @media (min-width: 768px) {
    section[id] { 
      scroll-margin-top: 100px; 
    }
  }
  
  /* IMPORTANTE: Cambiamos el reveal para que no afecte la posición del scroll */
  .reveal { 
    opacity: 0; 
    /* Bajamos la intensidad del desplazamiento para que el navegador no se confunda al calcular la posición */
    transform: translateY(15px); 
    transition: opacity 0.8s ease-out, transform 0.8s ease-out; 
    will-change: opacity, transform; 
  }
  
  .reveal.active { 
    opacity: 1; 
    transform: translateY(0); 
  }

  /* Si el usuario llega por link directo, forzamos visibilidad */
  section:target {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`}</style>

      <div
        style={{
          backgroundColor: theme?.background || "#FAF9F6",
          color: theme?.text || "#000",
          minHeight: "100vh",
        }}
      >
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Fallback de carga más amigable que una pantalla negra */}
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
              <p className="animate-pulse">Cargando Mokaya...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                user?.role === "admin" ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" />
                )
              }
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
