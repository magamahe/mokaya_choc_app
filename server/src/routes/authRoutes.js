const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

// Middleware para manejar los errores de validación
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// REGISTRO
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos // Si algo falla acá, no llega al controlador
], authController.register);

// LOGIN
router.post('/login', [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists(),
    validarCampos
], authController.login);

module.exports = router;