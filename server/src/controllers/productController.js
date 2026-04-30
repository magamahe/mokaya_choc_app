const Product = require('../models/Product');

// Obtener todos los productos (con los datos de la categoría)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoria', 'nombre');
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener productos' });
    }
};

// Crear un producto (Solo Admin)
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear el producto', error });
    }
};

// Actualizar stock o datos (Solo Admin)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar' });
    }
};

// Eliminar producto (Solo Admin)
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar' });
    }
};