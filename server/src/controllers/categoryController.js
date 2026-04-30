const Category = require('../models/Category');

// Obtener todas las categorías (Público)
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener categorías' });
    }
};

// Crear una categoría (Solo Admin)
exports.createCategory = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newCategory = new Category({ nombre, descripcion });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear la categoría. Tal vez ya existe.' });
    }
};

// Actualizar Categoría (Solo Admin)
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar categoría' });
    }
};

// Eliminar categoría (Solo Admin)
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Categoría eliminada' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar la categoría' });
    }
};
