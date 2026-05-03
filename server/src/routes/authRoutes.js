const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

// REGISTRO
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], authController.register);

// LOGIN
router.post('/login', [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], authController.login);

module.exports = router;