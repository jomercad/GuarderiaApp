// backend/middlewares/auth.js
const jwt = require("jsonwebtoken");

// Verifica que la petición incluya un token válido
const verifyToken = (req, res, next) => {
  // Se espera que el token venga en el header "Authorization" en el formato "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    // Se adjunta la información del usuario a la petición
    req.user = decoded;
    next();
  });
};

// Middleware para verificar que el rol del usuario esté entre los permitidos
const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ error: "Acceso denegado" });
    }
  };
};

module.exports = { verifyToken, checkRole };
