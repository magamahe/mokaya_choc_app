const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth'); 
const admin = require('../middlewares/admin'); 
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

// GET público
router.get('/', productController.getProducts);

// POST (admin)
router.post('/', [
  auth,
  admin,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('precio', 'El precio debe ser numérico').isNumeric(),
  check('stock', 'El stock debe ser numérico').isNumeric(),
  check('categoria', 'La categoría es obligatoria').not().isEmpty(),
  validarCampos
], productController.createProduct);

// PUT (admin)
router.put('/:id', [
  auth,
  admin,
  check('nombre').optional().not().isEmpty(),
  check('precio').optional().isNumeric(),
  check('stock').optional().isNumeric(),
  validarCampos
], productController.updateProduct);

// DELETE (admin)
router.delete('/:id', [auth, admin], productController.deleteProduct);

module.exports = router;