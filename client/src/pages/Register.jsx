import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMokayaTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Lock as LockIconMUI } from '@mui/icons-material';

const Register = () => {
  const { theme, darkMode } = useMokayaTheme();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { nombre, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }

    setLoading(true);
    try {
      await register(nombre, email, password);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al crear la cuenta. Intentá con otro email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20" 
         style={{ backgroundColor: theme.background }}>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl bg-white/40 backdrop-blur-xl border"
        style={{ borderColor: `${theme.primary}22` }}
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold italic mb-2" 
              style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}>
            Unite a <span style={{ color: theme.primary }}>Mokaya</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            Creá tu perfil de cata personalizada
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl text-sm bg-red-100 text-red-600 border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NOMBRE */}
          <div className="relative">
            <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{color: theme.text}}/>
            <input 
              name="nombre"
              type="text" 
              placeholder="Nombre completo"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={nombre}
              onChange={onChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{color: theme.text}} />
            <input 
              name="email"
              type="email" 
              placeholder="Tu email"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={email}
              onChange={onChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <LockIconMUI className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{color: theme.text}}/>
            <input 
              name="password"
              type="password" 
              placeholder="Contraseña (mín. 6 caracteres)"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={password}
              onChange={onChange}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <LockIconMUI className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{color: theme.text}}/>
            <input 
              name="confirmPassword"
              type="password" 
              placeholder="Confirmar contraseña"
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all"
              style={{ borderColor: `${theme.primary}44`, color: theme.text }}
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            style={{ 
              backgroundColor: theme.primary, 
              color: darkMode ? '#000' : '#fff' 
            }}
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm opacity-60">
          <p>¿Ya sos parte de Mokaya?</p>
          <Link to="/login" 
                className="font-bold hover:underline mt-1 block"
                style={{ color: theme.primary }}>
            Iniciar Sesión
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Register;