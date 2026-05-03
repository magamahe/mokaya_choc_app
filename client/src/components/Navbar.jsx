import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMokayaTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { IconButton, Button, Badge } from '@mui/material';
import { 
  Menu as MenuIcon, Close as CloseIcon, 
  Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, 
  ShoppingBagOutlined as ShoppingBagIcon, Logout as LogoutIcon 
} from '@mui/icons-material';

import logoMokaya from '../assets/logo.webp'; 

// Función para el scroll preciso (fuera del componente)
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80; 
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

const Navbar = ({ onCartClick }) => {
  const { darkMode, toggleTheme, theme } = useMokayaTheme();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPanelActive = location.pathname === '/admin' || location.pathname === '/mis-pedidos';

  const navLinks = [
    { name: 'Inicio', path: '/#top' },
    { name: 'Productos', path: '/#catalogo' },
    { name: 'Nosotros', path: '/#nosotros' },
    { name: 'Contacto', path: '/#contacto' },
  ];

  return (
    <nav 
      className="sticky top-0 z-50 px-6 py-2 transition-all duration-300"
      style={{ 
        backgroundColor: `${theme.background}ee`, 
        backdropFilter: 'blur(10px)', 
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.primary}22`,
        transform: 'translateZ(0)', 
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img src={logoMokaya} alt="Logo" className="h-10 md:h-14" style={{ filter: darkMode ? 'invert(1) brightness(2)' : 'none' }} />
        </Link>

        {/* TÍTULO CENTRAL (Panel) */}
        {isPanelActive && (
          <div className="flex-1 flex justify-center">
            <span className="font-bold uppercase tracking-widest text-[9px] md:text-[11px] opacity-70" style={{ color: theme.text }}>
              {location.pathname === '/admin' ? 'Panel Admin' : 'Mis Pedidos'}
            </span>
          </div>
        )}

        {/* NAVEGACIÓN DESKTOP */}
        {!isPanelActive && (
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <HashLink 
                smooth 
                key={link.name} 
                to={link.path} 
                scroll={el => scrollWithOffset(el)}
                className="font-medium uppercase tracking-widest text-[10px]" 
                style={{ color: theme.text }}
              >
                {link.name}
              </HashLink>
            ))}
            {user && <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>}
            {user?.role === 'client' && <Link to="/mis-pedidos" className="font-bold text-[10px] uppercase" style={{ color: theme.primary }}>Mis Pedidos</Link>}
            {user?.role === 'admin' && <Link to="/admin" className="font-bold text-[10px] uppercase border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>Panel Admin</Link>}
          </div>
        )}

        {/* ACCIONES DERECHA */}
        <div className="flex items-center space-x-2">
          {isPanelActive ? (
            <IconButton component={Link} to="/" style={{ color: theme.text }}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={toggleTheme} style={{ color: theme.text }}>
                {darkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>

              {user?.role !== 'admin' && (
                <IconButton onClick={onCartClick} style={{ color: theme.text }}>
                  <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: theme.primary, color: '#fff' } }}>
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>
              )}

              {/* Usuario Desktop: Oculto en móvil */}
              <div className="hidden md:block">
                {user ? (
                  <div className="flex items-center ml-2 gap-2">
                    <span className="text-[11px] font-bold italic" style={{ color: theme.text }}>Hola, {user.nombre?.split(' ')[0]}</span>
                    <IconButton onClick={() => { logout(); navigate('/'); }} size="small" style={{ color: theme.text, opacity: 0.6 }}><LogoutIcon fontSize="inherit"/></IconButton>
                  </div>
                ) : (
                  <Button component={Link} to="/login" variant="contained" style={{ backgroundColor: theme.primary, color: '#fff', borderRadius: '20px', fontSize: '10px' }}>Entrar</Button>
                )}
              </div>

              {/* Botón Menú Mobile */}
              <div className="md:hidden">
                <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: theme.text }}>
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div> {/* Aquí cerramos el div max-w-7xl */}

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {!isPanelActive && mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full p-8 space-y-6 flex flex-col shadow-2xl" style={{ backgroundColor: theme.background }}>
          {navLinks.map((link) => (
            <HashLink 
              smooth 
              key={link.name} 
              to={link.path} 
              scroll={el => scrollWithOffset(el)}
              onClick={() => setMobileMenuOpen(false)} 
              className="text-lg font-semibold uppercase tracking-widest" 
              style={{ color: theme.text }}
            >
              {link.name}
            </HashLink>
          ))}
          
          {user?.role === 'client' && (
            <Link to="/mis-pedidos" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold uppercase" style={{ color: theme.primary }}>Mis Pedidos</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold uppercase" style={{ color: theme.primary }}>Panel Admin</Link>
          )}

          <div className="pt-4 border-t" style={{ borderColor: `${theme.primary}22` }}>
            {user ? (
              <Button onClick={() => { logout(); navigate('/'); setMobileMenuOpen(false); }} fullWidth variant="outlined" style={{ borderColor: theme.primary, color: theme.primary }}>Cerrar Sesión</Button>
            ) : (
              <Button component={Link} to="/login" onClick={() => setMobileMenuOpen(false)} fullWidth variant="contained" style={{ backgroundColor: theme.primary, color: '#fff' }}>Entrar</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;