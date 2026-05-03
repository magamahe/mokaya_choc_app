import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import { useMokayaTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email"; // <-- Nombre 1
import LockIcon from "@mui/icons-material/Lock"; // <-- Nombre 2

const Login = () => {
  const { theme, darkMode } = useMokayaTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Error al iniciar sesión. Verificá tus datos.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: theme.background }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl bg-white/40 backdrop-blur-xl border"
        style={{ borderColor: `${theme.primary}22` }}
      >
        {/* CABECERA */}
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-bold mb-2"
            style={{
              color: theme.text,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Bienvenida a <span style={{ color: theme.primary }}>Mokaya</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            Ingresá a tu boutique de autor
          </p>
        </div>

        {/* MENSAJE DE ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 rounded-xl text-sm bg-red-100 text-red-600 border border-red-200 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
            <input
              type="email"
              placeholder="Tu email"
              autocomplete="current-password"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            
            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
            <input
              type="password"
              placeholder="Tu contraseña"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            style={{
              backgroundColor: theme.primary,
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {loading ? "Validando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm opacity-60">
          <p>¿No tenés una cuenta?</p>
          <Link
            to="/register"
            className="font-bold hover:underline mt-1 block"
            style={{ color: theme.primary }}
          >
            Crear cuenta de cliente
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
