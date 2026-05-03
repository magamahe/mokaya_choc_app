const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.header('x-auth-token');

    // Soporte Bearer
    if (!token && req.header('Authorization')) {
        token = req.header('Authorization').replace('Bearer ', '');
    }

    if (!token) {
        return res.status(401).json({ msg: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expirado' });
        }
        return res.status(401).json({ msg: 'Token inválido' });
    }
};