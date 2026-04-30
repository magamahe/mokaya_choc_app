const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// GET es para todos
router.get('/', categoryController.getCategories);

// POST y DELETE solo para el Admin logueado
router.post('/', [auth, admin], categoryController.createCategory);
router.put('/:id', [auth, admin], categoryController.updateCategory);
router.delete('/:id', [auth, admin], categoryController.deleteCategory);

module.exports = router;
