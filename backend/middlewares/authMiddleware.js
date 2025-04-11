// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

function authenticateToken(req, res, next) {
  // Se espera el token en el header Authorization en el formato "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // No autorizado

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido o expirado
    req.user = user; // Se adjunta la información del usuario decodificado a la solicitud
    next();
  });
}

module.exports = { authenticateToken };
