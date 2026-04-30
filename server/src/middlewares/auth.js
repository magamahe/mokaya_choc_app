const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header 
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = cifrado.user; // Guardamos los datos del usuario en la petición
        next(); // Vamos al siguiente paso (el controlador)
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};