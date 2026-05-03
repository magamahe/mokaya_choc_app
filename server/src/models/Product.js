const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    imagen: {
      type: String,
      match: [/^https?:\/\/.+/, "URL inválida"],
      default: "https://via.placeholder.com/150",
    },
    // RELACIÓN: Aquí guardamos el ID de la categoría
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Debe coincidir con el nombre del modelo Category
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
