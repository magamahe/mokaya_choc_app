import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Contextos
import { useMokayaTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

// Componentes Críticos (Carga inmediata)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// OPTIMIZACIÓN: Carga Perezosa (Lazy Loading) 
// Esto divide app en trozos pequeños para que el navegador no se bloquee
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


const LandingPage = React.memo(() => (
  <Suspense fallback={<div className="h-screen bg-black" />}>
    <main className="w-full">
      <section id="top"><Hero /></section>
      <section id="productos" className="reveal"><AboutProducts /></section>
      <section id="secretos" className="reveal"><ChocolateSecrets /></section>
      <section id="catalogo" className="reveal"><Catalog /></section>
      <section id="nosotros" className="reveal"><AboutUs /></section>
      <section id="features" className="reveal"><Features /></section>
      <section id="contacto" className="reveal"><Contact /></section>
      <section id="testimonios" className="reveal"><Testimonials /></section>
    </main>
  </Suspense>
));

function App() {
  const { theme } = useMokayaTheme();
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
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
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 100);

    return () => clearTimeout(timer);
  }, [user]); 

  return (
    <CartProvider>
      <style>{`
        section[id] { scroll-margin-top: 100px; }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; will-change: opacity, transform; }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>

      <div style={{ backgroundColor: theme?.background || "#FAF9F6", minHeight: "100vh" }}>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <Suspense fallback={<div className="h-screen" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />} />
            <Route path="/mis-pedidos" element={user ? <MyOrders /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;