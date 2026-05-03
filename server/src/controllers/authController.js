const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// =======================
// REGISTER
// =======================
exports.register = async (req, res) => {
    try {
        let { nombre, email, password } = req.body;

        // Validación básica
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        email = email.toLowerCase().trim();

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            nombre,
            email,
            password: hashedPassword,
            role: 'user' // Por defecto, todos los nuevos usuarios son "user"
        });

        await user.save();

        const payload = {
            user: { id: user.id, role: user.role }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });

        res.status(201).json({
            token,
            user: { id: user.id, nombre: user.nombre, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validación
        if (!email || !password) {
            return res.status(400).json({ msg: 'Datos incompletos' });
        }

        email = email.toLowerCase().trim();

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Simular un pequeño retraso para mejorar la experiencia de usuario
        await new Promise(resolve => setTimeout(resolve, 500));

        const payload = {
            user: { id: user.id, role: user.role }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });

        res.json({
            token,
            user: { id: user.id, nombre: user.nombre, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};