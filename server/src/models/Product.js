const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    imagen: {
        type: String, // Aquí guardarás la URL de la imagen
        default: 'https://via.placeholder.com/150'
    },
    // RELACIÓN: Aquí guardamos el ID de la categoría
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Debe coincidir con el nombre del modelo Category
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);