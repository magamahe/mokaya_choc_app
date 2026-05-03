const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

// Crear pedido
router.post('/', [
  auth,
  check('productos', 'Debe enviar productos').isArray({ min: 1 }),
  validarCampos
], orderController.createOrder);

// Mis pedidos
router.get('/my-orders', auth, orderController.getMyOrders);

// Todos (admin)
router.get('/', [auth, admin], orderController.getAllOrders);

// Update estado
router.put('/:id', [
  auth,
  admin,
  check('estado', 'Estado inválido').not().isEmpty(),
  validarCampos
], orderController.updateOrderStatus);

module.exports = router;