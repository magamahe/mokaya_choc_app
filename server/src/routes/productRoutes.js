const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth'); 
const admin = require('../middlewares/admin'); 

// GET es público: Todos pueden ver los chocolates
router.get('/', productController.getProducts);

// POST, PUT y DELETE son privados: Solo para Admins logueados
router.post('/', [auth, admin], productController.createProduct);
router.put('/:id', [auth, admin], productController.updateProduct);
router.delete('/:id', [auth, admin], productController.deleteProduct);

module.exports = router;