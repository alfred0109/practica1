const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    
    // Verifica si el encabezado de autorización está presente
    if (authorization) {
        const token = authorization.split(' ')[1]; // Extrae el token de "Bearer <token>"
        
        // Verifica el token usando jwt.verify
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Manejo del error de token inválido
                return res.status(401).json({ 
                    message: 'Token inválido', 
                    error: err.message // Proporciona información adicional sobre el error
                });
            }
            req.user = decoded; // Adjunta la información del usuario a la solicitud
            next(); // Continúa con la siguiente función middleware o ruta
        });
    } else {
        // Si no hay token, responde con un error
        return res.status(401).json({ message: 'Sin token' });
    }
};

module.exports = isAuth;