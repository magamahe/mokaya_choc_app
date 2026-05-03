import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMokayaTheme } from '../context/ThemeContext';
import { 
  AddCircle as AddIcon, 
  ReceiptLong as OrdersIcon, 
  Storefront as ProductIcon, 
  Delete as DeleteIcon,
  Edit as EditIcon,
  Category as CategoryIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';

const AdminPanel = () => {
  const { theme } = useMokayaTheme();
  const { api } = useAuth();
  
  const [view, setView] = useState('products'); // 'products', 'categories', 'orders'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null); 

  // Estados de formularios
  const [productForm, setProductForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '', categoria: '' });
  const [categoryForm, setCategoryForm] = useState({ nombre: '', descripcion: '' });

  const ESTADOS = ['pendiente', 'pagado', 'enviado', 'entregado'];

  useEffect(() => { 
    fetchData(); 
  }, [view]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Traemos todo en paralelo para que el panel esté siempre actualizado
      const [resP, resC, resO] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
        api.get('/orders')
      ]);
      setProducts(resP.data);
      setCategories(resC.data);
      setOrders(resO.data);
    } catch (error) { 
      console.error("Error al sincronizar con la boutique"); 
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE PRODUCTOS ---
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/products/${isEditing}`, productForm);
      } else {
        await api.post('/products', productForm);
      }
      setProductForm({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '', categoria: '' });
      setIsEditing(null);
      fetchData();
      alert("Catálogo actualizado");
    } catch (error) { alert("Error al guardar producto"); }
  };

  const startEditProduct = (p) => {
    setIsEditing(p._id);
    setProductForm({ 
        nombre: p.nombre, 
        descripcion: p.descripcion, 
        precio: p.precio, 
        stock: p.stock, 
        imagen: p.imagen, 
        categoria: p.categoria?._id || p.categoria 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LÓGICA DE CATEGORÍAS ---
  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/categories/${isEditing}`, categoryForm);
      } else {
        await api.post('/categories', categoryForm);
      }
      setCategoryForm({ nombre: '', descripcion: '' });
      setIsEditing(null);
      fetchData();
      alert("Categoría actualizada");
    } catch (error) { alert("Error al guardar categoría"); }
  };

  // --- LÓGICA DE PEDIDOS (Cambio de Estado) ---
  const handleStatusChange = async (orderId, nuevoEstado) => {
    try {
      await api.put(`/orders/${orderId}`, { estado: nuevoEstado });
      // Actualización reactiva de la lista local
      setOrders(orders.map(o => o._id === orderId ? { ...o, estado: nuevoEstado } : o));
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 flex flex-col md:flex-row gap-10" style={{ backgroundColor: theme.background }}>
      
      {/* SIDEBAR GESTIÓN */}
      <aside className="w-full md:w-72 space-y-4">
        <h2 className="text-2xl font-serif italic mb-8" style={{ color: theme.text }}>Mokaya Boutique</h2>
        
        <button onClick={() => {setView('products'); setIsEditing(null)}} 
          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === 'products' ? 'shadow-lg' : 'opacity-40'}`}
          style={{ backgroundColor: view === 'products' ? theme.primary : 'transparent', color: view === 'products' ? '#fff' : theme.text, borderColor: `${theme.primary}44` }}>
          <ProductIcon /> Colecciones
        </button>

        <button onClick={() => {setView('categories'); setIsEditing(null)}} 
          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === 'categories' ? 'shadow-lg' : 'opacity-40'}`}
          style={{ backgroundColor: view === 'categories' ? theme.primary : 'transparent', color: view === 'categories' ? '#fff' : theme.text, borderColor: `${theme.primary}44` }}>
          <CategoryIcon /> Categorías
        </button>

        <button onClick={() => {setView('orders'); setIsEditing(null)}} 
          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === 'orders' ? 'shadow-lg' : 'opacity-40'}`}
          style={{ backgroundColor: view === 'orders' ? theme.primary : 'transparent', color: view === 'orders' ? '#fff' : theme.text, borderColor: `${theme.primary}44` }}>
          <OrdersIcon /> Pedidos de Clientes
        </button>
      </aside>

      {/* ÁREA DE TRABAJO DINÁMICA */}
      <main className="flex-1 pb-20">
        
        {loading && <p className="italic opacity-50 mb-4 text-center">Sincronizando boutique...</p>}

        {/* --- SECCIÓN PRODUCTOS --- */}
        {view === 'products' && (
          <div className="space-y-10">
            <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${theme.primary}22` }}>
              <h3 className="text-xl font-bold mb-6 italic">{isEditing ? 'Editar Chocolate' : 'Nuevo Chocolate de Autor'}</h3>
              <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="p-4 rounded-2xl border bg-transparent" value={productForm.nombre} onChange={(e) => setProductForm({...productForm, nombre: e.target.value})} required />
                <input type="number" placeholder="Precio ($)" className="p-4 rounded-2xl border bg-transparent" value={productForm.precio} onChange={(e) => setProductForm({...productForm, precio: e.target.value})} required />
                <input type="number" placeholder="Stock" className="p-4 rounded-2xl border bg-transparent" value={productForm.stock} onChange={(e) => setProductForm({...productForm, stock: e.target.value})} required />
                <select className="p-4 rounded-2xl border bg-transparent" value={productForm.categoria} onChange={(e) => setProductForm({...productForm, categoria: e.target.value})} required>
                  <option value="">Categoría...</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.nombre}</option>)}
                </select>
                <input type="text" placeholder="URL Imagen" className="p-4 rounded-2xl border bg-transparent md:col-span-2" value={productForm.imagen} onChange={(e) => setProductForm({...productForm, imagen: e.target.value})} required />
                <textarea placeholder="Perfil de sabor..." className="p-4 rounded-2xl border bg-transparent md:col-span-2" value={productForm.descripcion} onChange={(e) => setProductForm({...productForm, descripcion: e.target.value})} required />
                <button type="submit" className="md:col-span-2 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]" style={{ backgroundColor: theme.primary, color: '#fff' }}>
                  {isEditing ? 'Guardar Cambios' : 'Publicar en Boutique'}
                </button>
              </form>
            </section>

            <div className="grid grid-cols-1 gap-3">
              {products.map(p => (
                <div key={p._id} className="flex items-center justify-between p-4 bg-white/20 rounded-2xl border border-white/10 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={p.imagen} className="w-14 h-14 rounded-xl object-cover" alt={p.nombre} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: theme.text }}>{p.nombre}</p>
                      <p className="text-[10px] opacity-40 uppercase tracking-tighter">STOCK: {p.stock} | ${p.precio}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditProduct(p)} className="p-2 text-blue-400 hover:scale-110 transition-transform"><EditIcon fontSize="small" /></button>
                    <button onClick={async () => { if(window.confirm("¿Eliminar?")) { await api.delete(`/products/${p._id}`); fetchData(); } }} className="p-2 text-red-400 hover:scale-110 transition-transform"><DeleteIcon fontSize="small" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECCIÓN CATEGORÍAS --- */}
        {view === 'categories' && (
          <div className="space-y-10">
            <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${theme.primary}22` }}>
              <h3 className="text-xl font-bold mb-6 italic">{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
              <form onSubmit={saveCategory} className="flex flex-col gap-4">
                <input type="text" placeholder="Ej: Trufas Premium" className="p-4 rounded-2xl border bg-transparent" value={categoryForm.nombre} onChange={(e) => setCategoryForm({...categoryForm, nombre: e.target.value})} required />
                <input type="text" placeholder="Descripción breve" className="p-4 rounded-2xl border bg-transparent" value={categoryForm.descripcion} onChange={(e) => setCategoryForm({...categoryForm, descripcion: e.target.value})} />
                <button type="submit" className="py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]" style={{ backgroundColor: theme.primary, color: '#fff' }}>
                  {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
              </form>
            </section>

            <div className="grid grid-cols-1 gap-3">
              {categories.map(c => (
                <div key={c._id} className="flex items-center justify-between p-5 bg-white/20 rounded-2xl border border-white/10 shadow-sm">
                  <div>
                    <p className="font-bold" style={{ color: theme.text }}>{c.nombre}</p>
                    <p className="text-xs opacity-40">{c.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setIsEditing(c._id); setCategoryForm({nombre: c.nombre, descripcion: c.descripcion}); }} className="p-2 text-blue-400"><EditIcon fontSize="small" /></button>
                    <button onClick={async () => { if(window.confirm("¿Eliminar?")) { await api.delete(`/categories/${c._id}`); fetchData(); } }} className="p-2 text-red-400"><DeleteIcon fontSize="small" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECCIÓN PEDIDOS (LA QUE FALTABA) --- */}
        {view === 'orders' && (
          <section className="space-y-6">
            <h3 className="text-xl font-bold italic mb-6" style={{ color: theme.text }}>Gestión de Pedidos</h3>
            {orders.length === 0 ? (
              <p className="italic opacity-40 text-center py-20">No hay pedidos registrados en la boutique.</p>
            ) : (
              orders.map(o => (
                <div key={o._id} className="p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border shadow-sm flex flex-col gap-6" style={{ borderColor: `${theme.primary}22` }}>
                  
                  {/* Encabezado Pedido */}
                  <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: `${theme.primary}11` }}>
                    <div>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest mb-1">Orden #{o._id.slice(-6)}</p>
                      <h4 className="text-lg font-bold" style={{ color: theme.text }}>{o.usuario?.nombre || 'Invitado'}</h4>
                      <p className="text-xs opacity-60">{o.usuario?.email}</p>
                    </div>
                    <p className="text-2xl font-light" style={{ color: theme.primary }}>${o.total.toLocaleString()}</p>
                  </div>

                  {/* Detalle Productos */}
                  <div className="space-y-2">
                    {o.productos?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span style={{ color: theme.text }}>
                          <strong style={{ color: theme.primary }}>{item.cantidad}x</strong> {item.producto?.nombre || 'Item eliminado'}
                        </span>
                        <span className="opacity-50">${(item.producto?.precio * item.cantidad || 0).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selector de Estado */}
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${theme.primary}11` }}>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Logística:</span>
                      <select 
                        value={o.estado}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className="bg-transparent border-none font-bold text-xs uppercase tracking-[0.2em] focus:ring-0 cursor-pointer"
                        style={{ color: o.estado === 'entregado' ? '#10b981' : theme.primary }}
                      >
                        {ESTADOS.map(est => (
                          <option key={est} value={est}>{est.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    {o.estado === 'entregado' && <SuccessIcon style={{ color: '#10b981' }} fontSize="small" />}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;