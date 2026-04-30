const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// Crear un pedido (Logueado)
router.post('/', auth, orderController.createOrder);

// Ver mis propios pedidos (Logueado)
router.get('/my-orders', auth, orderController.getMyOrders);

// Ver todos los pedidos (Solo Admin)
router.get('/all', [auth, admin], orderController.getAllOrders);

// Actualizar estado (Solo Admin)
router.put('/:id', [auth, admin], orderController.updateOrderStatus);

module.exports = router;