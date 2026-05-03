const Order = require("../models/Order");
const Product = require("../models/Product");

// =========================
// 🛒 CREAR PEDIDO
// =========================
exports.createOrder = async (req, res) => {
  try {
    const { productos } = req.body;

    // 🔒 Auth check
    if (!req.user) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // 🔒 Validación base
    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ msg: "Productos inválidos" });
    }

    let total = 0;
    const productosProcesados = [];

    for (const item of productos) {
      const { producto, cantidad } = item;

      // 🔒 Validaciones fuertes
      if (!producto || typeof cantidad !== "number" || cantidad <= 0) {
        return res.status(400).json({ msg: "Datos de producto inválidos" });
      }

      const productData = await Product.findById(producto);

      if (!productData) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      if (productData.stock < cantidad) {
        return res.status(400).json({
          msg: `Stock insuficiente para: ${productData.nombre}`,
        });
      }

      // 💰 cálculo
      total += productData.precio * cantidad;

      // 🧠 guardamos solo lo necesario
      productosProcesados.push({
        producto: productData._id,
        cantidad,
      });

      // 🔐 actualización más segura
      await Product.findByIdAndUpdate(producto, {
        $inc: { stock: -cantidad },
      });
    }

    const newOrder = new Order({
      usuario: req.user.id,
      productos: productosProcesados,
      total,
    });

    await newOrder.save();

    res.status(201).json(newOrder);

  } catch (error) {
    console.error("Error createOrder:", error);
    res.status(500).json({ msg: "Error al procesar el pedido" });
  }
};

// =========================
// 📦 PEDIDOS DEL USUARIO
// =========================
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const orders = await Order.find({ usuario: req.user.id })
      .populate("productos.producto", "nombre precio imagen")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error("Error getMyOrders:", error);
    res.status(500).json({ msg: "Error al obtener tus pedidos" });
  }
};

// =========================
// 📊 TODOS LOS PEDIDOS (ADMIN)
// =========================
exports.getAllOrders = async (req, res) => {
  try {
    // 🔒 seguridad extra (por si falla el middleware)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Acceso denegado" });
    }

    const orders = await Order.find()
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error("Error getAllOrders:", error);
    res.status(500).json({ msg: "Error al obtener pedidos globales" });
  }
};

// =========================
// 🔄 ACTUALIZAR ESTADO (ADMIN)
// =========================
exports.updateOrderStatus = async (req, res) => {
  try {
    // 🔒 seguridad extra
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Acceso denegado" });
    }

    const { estado } = req.body;

    const estadosValidos = ["pendiente", "pagado", "enviado", "entregado"];

    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({ msg: "Estado de pedido no válido" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    )
      .populate("usuario", "nombre email")
      .populate("productos.producto");

    if (!order) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }

    res.json(order);

  } catch (error) {
    console.error("Error updateOrderStatus:", error);
    res.status(500).json({ msg: "Error al actualizar el estado del pedido" });
  }
};