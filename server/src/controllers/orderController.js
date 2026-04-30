const Order = require("../models/Order");
const Product = require("../models/Product");

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const { productos } = req.body;
    let total = 0;

    for (const item of productos) {
      const productData = await Product.findById(item.producto);

      if (!productData)
        return res
          .status(404)
          .json({ msg: `Producto no encontrado: ${item.producto}` });

      if (productData.stock < item.cantidad) {
        return res
          .status(400)
          .json({ msg: `Stock insuficiente para: ${productData.nombre}` });
      }

      total += productData.precio * item.cantidad;

      productData.stock -= item.cantidad;
      await productData.save();
    }

    const newOrder = new Order({
      usuario: req.user.id,
      productos,
      total,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al procesar el pedido" });
  }
};

// Obtener pedidos del usuario logueado
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ usuario: req.user.id })
      .populate("productos.producto", "nombre precio imagen")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tus pedidos" });
  }
};

// Obtener TODOS los pedidos (Vista del Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("usuario", "nombre email")
      .populate("productos.producto", "nombre precio imagen") // Agregamos imagen para el panel
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedidos globales" });
  }
};

// Actualizar Estado del Pedido (Solo Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    // Validamos el estado recibido
    const estadosValidos = ["pendiente", "pagado", "enviado", "entregado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ msg: "Estado de pedido no válido" });
    }
  // Actualizamos el estado del pedido
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true },
    )
    // Agregamos populate para mostrar detalles del usuario y productos en la respuesta
      .populate("usuario", "nombre email")
      .populate("productos.producto");
// Verificamos si el pedido existe
    if (!order) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }
    // Respondemos con el pedido actualizado
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el estado del pedido" });
  }
};
