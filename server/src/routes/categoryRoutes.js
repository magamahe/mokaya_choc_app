const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

// GET público
router.get('/', categoryController.getCategories);

// CREATE
router.post('/', [
  auth,
  admin,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], categoryController.createCategory);

// UPDATE
router.put('/:id', [
  auth,
  admin,
  check('nombre').optional().not().isEmpty(),
  validarCampos
], categoryController.updateCategory);

// DELETE
router.delete('/:id', [auth, admin], categoryController.deleteCategory);

module.exports = router;