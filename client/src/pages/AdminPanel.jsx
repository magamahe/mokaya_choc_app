import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useMokayaTheme } from "../context/ThemeContext";
import {
  AddCircle as AddIcon,
  ReceiptLong as OrdersIcon,
  Storefront as ProductIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Category as CategoryIcon,
  CheckCircle as SuccessIcon,
} from "@mui/icons-material";

const AdminPanel = () => {
  const { theme } = useMokayaTheme();
  const { api } = useAuth();

  const [view, setView] = useState("products"); // 'products', 'categories', 'orders'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Estados de edición (IDs)
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Estados de formularios
  const [productForm, setProductForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
  });
  
  const [categoryForm, setCategoryForm] = useState({
    nombre: "",
    descripcion: "",
  });

  const ESTADOS = ["pendiente", "pagado", "enviado", "entregado"];

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resP, resC, resO] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
        api.get("/orders"),
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
      if (!productForm.categoria) return alert("Seleccioná una categoría");

      const productData = {
        ...productForm,
        precio: Number(productForm.precio),
        stock: Number(productForm.stock),
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct}`, productData);
      } else {
        await api.post("/products", productData);
      }

      resetProductForm();
      fetchData();
      alert("Catálogo actualizado");
    } catch (error) {
      alert(error.response?.data?.message || "Error al guardar producto");
    }
  };

  const startEditProduct = (p) => {
    setEditingProduct(p._id);
    setProductForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      stock: p.stock,
      imagen: p.imagen,
      categoria: p.categoria?._id || p.categoria,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetProductForm = () => {
    setProductForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "", categoria: "" });
    setEditingProduct(null);
  };

  // --- LÓGICA DE CATEGORÍAS (FIXED) ---
  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // UPDATE (PUT)
        await api.put(`/categories/${editingCategory}`, categoryForm);
        alert("Categoría actualizada correctamente");
      } else {
        // CREATE (POST)
        await api.post("/categories", categoryForm);
        alert("Nueva categoría creada");
      }
      resetCategoryForm();
      fetchData();
    } catch (error) {
      console.error("Error Categoría:", error.response?.data);
      alert(error.response?.data?.msg || "Error al procesar categoría");
    }
  };

  const startEditCategory = (c) => {
    setEditingCategory(c._id);
    setCategoryForm({
      nombre: c.nombre,
      descripcion: c.descripcion || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetCategoryForm = () => {
    setCategoryForm({ nombre: "", descripcion: "" });
    setEditingCategory(null);
  };

  // --- LÓGICA DE PEDIDOS ---
  const handleStatusChange = async (orderId, nuevoEstado) => {
    try {
      await api.put(`/orders/${orderId}`, { estado: nuevoEstado });
      setOrders(orders.map((o) => o._id === orderId ? { ...o, estado: nuevoEstado } : o));
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 flex flex-col md:flex-row gap-10" style={{ backgroundColor: theme.background }}>
      
      {/* SIDEBAR GESTIÓN */}
      <aside className="w-full md:w-72 space-y-4">
        <h2 className="text-2xl font-serif italic mb-8" style={{ color: theme.text }}>Mokaya Boutique</h2>

        <button onClick={() => setView("products")} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === "products" ? "shadow-lg" : "opacity-40"}`}
          style={{ backgroundColor: view === "products" ? theme.primary : "transparent", color: view === "products" ? "#fff" : theme.text, borderColor: `${theme.primary}44` }}>
          <ProductIcon /> Colecciones
        </button>

        <button onClick={() => setView("categories")} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === "categories" ? "shadow-lg" : "opacity-40"}`}
          style={{ backgroundColor: view === "categories" ? theme.primary : "transparent", color: view === "categories" ? "#fff" : theme.text, borderColor: `${theme.primary}44` }}>
          <CategoryIcon /> Categorías
        </button>

        <button onClick={() => setView("orders")} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border ${view === "orders" ? "shadow-lg" : "opacity-40"}`}
          style={{ backgroundColor: view === "orders" ? theme.primary : "transparent", color: view === "orders" ? "#fff" : theme.text, borderColor: `${theme.primary}44` }}>
          <OrdersIcon /> Pedidos
        </button>
      </aside>

      {/* ÁREA DE TRABAJO */}
      <main className="flex-1 pb-20">
        
        {/* --- SECCIÓN PRODUCTOS --- */}
        {view === "products" && (
          <div className="space-y-10">
            <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${theme.primary}22` }}>
              <h3 className="text-xl font-bold mb-6 italic">{editingProduct ? "✏️ Editar Chocolate" : "✨ Nuevo Chocolate"}</h3>
              <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="p-4 rounded-2xl border bg-transparent" value={productForm.nombre} onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })} required />
                <input type="number" placeholder="Precio" className="p-4 rounded-2xl border bg-transparent" value={productForm.precio} onChange={(e) => setProductForm({ ...productForm, precio: e.target.value })} required />
                <input type="number" placeholder="Stock" className="p-4 rounded-2xl border bg-transparent" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required />
                <select className="p-4 rounded-2xl border bg-transparent" value={productForm.categoria} onChange={(e) => setProductForm({ ...productForm, categoria: e.target.value })} required>
                  <option value="">Categoría...</option>
                  {categories.map((c) => <option key={c._id} value={c._id}>{c.nombre}</option>)}
                </select>
                <input type="text" placeholder="URL Imagen" className="p-4 rounded-2xl border bg-transparent md:col-span-2" value={productForm.imagen} onChange={(e) => setProductForm({ ...productForm, imagen: e.target.value })} required />
                <textarea placeholder="Descripción..." className="p-4 rounded-2xl border bg-transparent md:col-span-2" value={productForm.descripcion} onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })} required />
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]" style={{ backgroundColor: theme.primary, color: "#fff" }}>
                    {editingProduct ? "Guardar Cambios" : "Publicar"}
                  </button>
                  {editingProduct && <button type="button" onClick={resetProductForm} className="px-8 py-4 rounded-2xl bg-gray-200 text-gray-600 font-bold text-[10px] uppercase">Cancelar</button>}
                </div>
              </form>
            </section>

            <div className="grid grid-cols-1 gap-3">
              {products.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-4 bg-white/20 rounded-2xl border border-white/10 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={p.imagen} className="w-14 h-14 rounded-xl object-cover" alt={p.nombre} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: theme.text }}>{p.nombre}</p>
                      <p className="text-[10px] opacity-40">STOCK: {p.stock} | ${p.precio}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditProduct(p)} className="p-2 text-blue-400"><EditIcon fontSize="small" /></button>
                    <button onClick={async () => { if(window.confirm("¿Eliminar?")) { await api.delete(`/products/${p._id}`); fetchData(); } }} className="p-2 text-red-400"><DeleteIcon fontSize="small" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECCIÓN CATEGORÍAS --- */}
        {view === "categories" && (
          <div className="space-y-10">
            <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${theme.primary}22` }}>
              <h3 className="text-xl font-bold mb-6 italic">{editingCategory ? "✏️ Editando Categoría" : "✨ Nueva Categoría"}</h3>
              <form onSubmit={saveCategory} className="flex flex-col gap-4">
                <input type="text" placeholder="Nombre" className="p-4 rounded-2xl border bg-transparent" value={categoryForm.nombre} onChange={(e) => setCategoryForm({ ...categoryForm, nombre: e.target.value })} required />
                <input type="text" placeholder="Descripción" className="p-4 rounded-2xl border bg-transparent" value={categoryForm.descripcion} onChange={(e) => setCategoryForm({ ...categoryForm, descripcion: e.target.value })} />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]" style={{ backgroundColor: theme.primary, color: "#fff" }}>
                    {editingCategory ? "Actualizar" : "Crear"}
                  </button>
                  {editingCategory && <button type="button" onClick={resetCategoryForm} className="px-8 py-4 rounded-2xl bg-gray-200 text-gray-600 font-bold text-[10px] uppercase">Cancelar</button>}
                </div>
              </form>
            </section>

            <div className="grid grid-cols-1 gap-3">
              {categories.map((c) => (
                <div key={c._id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${editingCategory === c._id ? 'border-blue-400 bg-white' : 'border-white/10 bg-white/20'}`}>
                  <div>
                    <p className="font-bold" style={{ color: theme.text }}>{c.nombre}</p>
                    <p className="text-xs opacity-40">{c.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditCategory(c)} className="p-2 text-blue-500"><EditIcon fontSize="small" /></button>
                    <button onClick={async () => { if(window.confirm("¿Eliminar?")) { try { await api.delete(`/categories/${c._id}`); fetchData(); } catch(e){ alert("No se puede eliminar (tiene productos)") } } }} className="p-2 text-red-400"><DeleteIcon fontSize="small" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SECCIÓN PEDIDOS --- */}
        {view === "orders" && (
          <section className="space-y-6">
            {orders.map((o) => (
              <div key={o._id} className="p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${theme.primary}22` }}>
                <div className="flex justify-between items-start border-b pb-4 mb-4" style={{ borderColor: `${theme.primary}11` }}>
                  <div>
                    <p className="text-[10px] opacity-40 uppercase mb-1">Orden #{o._id.slice(-6)}</p>
                    <h4 className="text-lg font-bold" style={{ color: theme.text }}>{o.usuario?.nombre || "Cliente"}</h4>
                  </div>
                  <p className="text-2xl font-light" style={{ color: theme.primary }}>${o.total.toLocaleString()}</p>
                </div>
                <div className="space-y-1 mb-6">
                  {o.productos?.map((item, idx) => (
                    <p key={idx} className="text-sm opacity-70"><strong>{item.cantidad}x</strong> {item.producto?.nombre}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${theme.primary}11` }}>
                  <select value={o.estado} onChange={(e) => handleStatusChange(o._id, e.target.value)} className="bg-transparent font-bold text-xs uppercase outline-none" style={{ color: o.estado === "entregado" ? "#10b981" : theme.primary }}>
                    {ESTADOS.map((est) => <option key={est} value={est}>{est.toUpperCase()}</option>)}
                  </select>
                  {o.estado === "entregado" && <SuccessIcon style={{ color: "#10b981" }} fontSize="small" />}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;