const Category = require('../models/Category');

// GET
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener categorías' });
    }
};

// CREATE
exports.createCategory = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ msg: 'Nombre requerido' });
        }

        const newCategory = new Category({
            nombre: nombre.trim(),
            descripcion: descripcion?.trim()
        });

        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error al crear categoría' });
    }
};

// UPDATE
exports.updateCategory = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        res.json(updated);

    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar categoría' });
    }
};

// DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        res.json({ msg: 'Categoría eliminada' });

    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar categoría' });
    }
};