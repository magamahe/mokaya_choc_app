import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useMokayaTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CartDrawer = ({ isOpen, onClose }) => {
  const { theme, darkMode } = useMokayaTheme();
  const { cart, addToCart, decreaseQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user, api } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const enviarPedidoWhatsApp = (items, total, orderId) => {
    const numeroTelefono = import.meta.env.VITE_WHATSAPP_PHONE;
    const listaProductos = items.map(item => `• *${item.nombre}* (x${item.quantity})`).join('\n');
    const mensaje = encodeURIComponent(
      `¡Hola Mokaya! ✨\n\nHe realizado un pedido (#${orderId.slice(-6)}):\n\n${listaProductos}\n\n*Total: $${total.toLocaleString()}*\n\nSoy ${user.nombre}, ¿me confirman los pasos para el pago?`
    );
    window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, '_blank');
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Inicia sesión para finalizar tu pedido.");
      navigate('/login');
      onClose();
      return;
    }
    setLoading(true);
    try {
      const pedidoData = { productos: cart.map(item => ({ producto: item._id, cantidad: item.quantity })) };
      const response = await api.post('/orders', pedidoData);
      if (response.status === 201) {
        setShowSuccess(true);
        enviarPedidoWhatsApp(cart, cartTotal, response.data._id);
        setTimeout(() => { clearCart(); setShowSuccess(false); onClose(); }, 5000);
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Error en el pedido.");
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />

          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[101] shadow-2xl flex flex-col"
            style={{ backgroundColor: theme.background }}
          >
            {/* HEADER */}
            <div className="p-8 flex justify-between items-center border-b" style={{ borderColor: `${theme.primary}15` }}>
              <h2 className="text-2xl font-bold italic" style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}>Tu Selección</h2>
              <button onClick={onClose}><CloseIcon style={{ color: theme.text }} /></button>
            </div>

            {/* PRODUCTOS */}
            <div className="flex-grow overflow-y-auto p-8">
              {showSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <CheckCircleIcon style={{ fontSize: 40, color: theme.primary }} />
                  <p style={{ color: theme.text }}>¡Pedido enviado!</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center opacity-20"><ShoppingBagIcon style={{ fontSize: 60 }} /></div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-5 items-start">
                      <img src={item.imagen} alt={item.nombre} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-sm" style={{ color: theme.text }}>{item.nombre}</h4>
                          {/* BOTÓN ELIMINAR (TACHITO) */}
                          <button onClick={() => removeFromCart(item._id)} className="opacity-30 hover:opacity-100 transition-opacity">
                            <DeleteIcon fontSize="small" style={{ color: theme.text }} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-4">
                          <div className="flex items-center border rounded-full px-2" style={{ borderColor: `${theme.primary}40` }}>
                            {/* BOTÓN MENOS */}
                            <button className="p-1" onClick={() => decreaseQuantity(item._id)}>
                              <RemoveIcon style={{ fontSize: 14, color: theme.text }} />
                            </button>
                            <span className="px-3 text-xs font-bold" style={{ color: theme.text }}>{item.quantity}</span>
                            {/* BOTÓN MÁS */}
                            <button className="p-1" onClick={() => addToCart(item)}>
                              <AddIcon style={{ fontSize: 14, color: theme.text }} />
                            </button>
                          </div>
                          <span className="ml-auto font-bold" style={{ color: theme.primary }}>${(item.precio * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER TOTAL */}
            {!showSuccess && cart.length > 0 && (
              <div className="p-8 border-t" style={{ borderColor: `${theme.primary}15` }}>
                <div className="flex justify-between mb-6">
                  <span style={{ color: theme.text }} className="opacity-50 uppercase text-[10px] tracking-widest">Total</span>
                  <span className="text-2xl font-serif" style={{ color: theme.primary }}>${cartTotal.toLocaleString()}</span>
                </div>
                <button onClick={handleCheckout} className="w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest"
                  style={{ backgroundColor: theme.primary, color: darkMode ? '#000' : '#fff' }}>
                  {loading ? "Procesando..." : "Finalizar por WhatsApp"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;