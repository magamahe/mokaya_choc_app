import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMokayaTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Catalog = () => {
  const { theme, darkMode } = useMokayaTheme();
  const { addToCart } = useCart();
  const { user, api } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState(["Todos"]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let mounted = true;

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [resProds, resCats] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
      ]);

      if (!mounted) return;

      setProductos(resProds.data);
      setCategorias(["Todos", ...resCats.data.map((c) => c.nombre)]);
    } catch (error) {
      console.error("Error al conectar con la chocolatería:", error);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  cargarDatos();

  return () => {
    mounted = false;
  };
}, []);

  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    if (prod.stock <= 0) return;
    if (!user) {
      alert("Para adquirir nuestras colecciones de autor, por favor inicia sesión.");
      navigate("/login");
      return;
    }
    addToCart(prod);
  };

  const productosFiltrados = productos.filter((prod) => {
    const nombreCat = prod.categoria?.nombre || "Sin Categoría";
    const coincideCategoria = categoriaActiva === "Todos" || nombreCat === categoriaActiva;
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // CONFIGURACIÓN DE ANIMACIÓN PARA LAS TARJETAS
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  if (loading) return <div className="text-center py-40 opacity-50 italic">Sincronizando bodega...</div>;

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.background }}>
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-[2px]" style={{ backgroundColor: theme.primary }}></div>
              <span className="uppercase tracking-[0.3em] text-xs font-bold" style={{ color: theme.primary }}>
                Boutique Online
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight" 
                style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}>
              Nuestras <span style={{ color: theme.primary }}>Piezas</span>
            </h2>
          </div>

          <div className="relative w-full md:w-80 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{ color: theme.text }} />
            <input
              type="text"
              placeholder="Buscar sabor..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-transparent focus:outline-none transition-all text-sm shadow-sm"
              style={{ borderColor: `${theme.primary}33`, color: theme.text }}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 border-b pb-8" style={{ borderColor: `${theme.primary}15` }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border"
              style={{
                backgroundColor: categoriaActiva === cat ? theme.primary : "transparent",
                color: categoriaActiva === cat ? (darkMode ? "#000" : "#fff") : theme.text,
                borderColor: categoriaActiva === cat ? theme.primary : `${theme.primary}22`,
                opacity: categoriaActiva === cat ? 1 : 0.6
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLA CON ANIMACIÓN FLUIDA */}
        <motion.div 
          layout // Este layout en el padre ayuda a que la grilla entera se ajuste
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {productosFiltrados.map((prod) => (
              <motion.div
                layout // El layout aquí hace que el movimiento de reorden sea suave
                key={prod._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 1
                }}
                className="group flex flex-col h-full rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                style={{ 
                  backgroundColor: darkMode ? "#1a1a1a" : "#fff",
                  border: `1px solid ${theme.primary}15`
                }}
              >
                {/* ÁREA DE IMAGEN */}
                <div className="relative overflow-hidden aspect-square">
                  {prod.stock <= 0 && (
                    <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                      SOLD OUT
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm"
                       style={{ color: theme.primary }}>
                    {prod.categoria?.nombre}
                  </div>

                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${prod.stock <= 0 ? "grayscale opacity-60" : ""}`}
                  />
                </div>

                {/* ÁREA DE INFORMACIÓN */}
                <div className="p-6 flex flex-col flex-grow space-y-4" 
                     style={{ backgroundColor: darkMode ? "#121212" : `${theme.primary}08` }}>
                  
                  <div className="flex-grow space-y-2">
                    <h3 className="text-xl font-bold" style={{ color: theme.text, fontFamily: "'Playfair Display', serif" }}>
                      {prod.nombre}
                    </h3>
                    <p className="text-xs opacity-60 leading-relaxed line-clamp-4" style={{ color: theme.text }}>
                      {prod.descripcion}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: `${theme.primary}15` }}>
                    <span className="text-2xl font-light" style={{ color: theme.primary }}>
                      ${prod.precio.toLocaleString()}
                    </span>

                    {user?.role !== "admin" ? (
                      <button
                        disabled={prod.stock <= 0}
                        className="p-3 rounded-2xl transition-all active:scale-95 shadow-md disabled:opacity-30"
                        style={{ 
                          backgroundColor: theme.primary, 
                          color: darkMode ? "#000" : "#fff",
                          cursor: prod.stock <= 0 ? 'not-allowed' : 'pointer'
                        }}
                        onClick={(e) => handleAddToCart(e, prod)}
                      >
                        <AddShoppingCartIcon sx={{ fontSize: 20 }} />
                      </button>
                    ) : (
                      <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                        Modo Gestión
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* FEEDBACK SIN RESULTADOS */}
        {productosFiltrados.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-32 opacity-30 italic font-serif text-2xl"
          >
            No encontramos lo que buscas en nuestra cava...
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Catalog;