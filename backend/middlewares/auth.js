const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) throw new Error("Usuario no encontrado");

    // req.user = user;
    req.user = {
      id: user.id,
      role: user.role,
      parentId: user.parentId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Acceso prohibido para el rol ${req.user.role}`,
      });
    }
    next();
  };
};
