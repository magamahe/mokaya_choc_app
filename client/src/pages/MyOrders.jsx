import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMokayaTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const MyOrders = () => {
  const { theme } = useMokayaTheme();
  const { api, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        setOrders(res.data);
      } catch (error) {
        console.error("Error al traer tus pedidos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
    window.scrollTo(0, 0);
  }, [api]);

  // Función para darle color al estado
  const getStatusStyle = (estado) => {
    switch (estado) {
      case 'entregado': return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'enviado': return { bg: '#E3F2FD', text: '#1565C0' };
      case 'pagado': return { bg: '#FFF3E0', text: '#EF6C00' };
      default: return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center italic opacity-50">Sincronizando tu historial...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: theme.background }}>
      <div className="max-w-3xl mx-auto">
        
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-bold italic mb-2" style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}>
            Mis <span style={{ color: theme.primary }}>Pedidos</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">Tu colección personal de Mokaya</p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 opacity-40 border-2 border-dashed rounded-[2rem]" style={{ borderColor: `${theme.primary}22` }}>
            <ShoppingBagIcon sx={{ fontSize: 50, mb: 2 }} />
            <p className="font-serif italic text-lg">Aún no has realizado pedidos.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order._id}
                className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 border shadow-sm"
                style={{ borderColor: `${theme.primary}22` }}
              >
                {/* Encabezado del Pedido */}
                <div className="flex flex-col md:flex-row justify-between mb-6 border-b pb-4 gap-4" style={{ borderColor: `${theme.primary}11` }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarTodayIcon sx={{ fontSize: 14, opacity: 0.5 }} />
                      <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50">
                        {new Date(order.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: theme.text }}>Orden #{order._id.slice(-6).toUpperCase()}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-2xl font-light" style={{ color: theme.primary }}>${order.total.toLocaleString()}</p>
                    </div>
                    <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" 
                          style={{ backgroundColor: getStatusStyle(order.estado).bg, color: getStatusStyle(order.estado).text }}>
                      {order.estado}
                    </span>
                  </div>
                </div>

                {/* Detalle de Productos */}
                <div className="space-y-4">
                  {order.productos.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={item.producto?.imagen} alt="" className="w-12 h-12 rounded-full object-cover border" style={{ borderColor: `${theme.primary}22` }} />
                      <div className="flex-grow">
                        <p className="text-sm font-bold" style={{ color: theme.text }}>
                          {item.cantidad}x {item.producto?.nombre || 'Producto no disponible'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;