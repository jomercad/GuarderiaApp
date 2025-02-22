const { authenticateJWT, authorizeRoles } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Parent } = require("../models");

// Endpoint público para registrar un usuario como "parent"
router.post("/register-parent", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Validar que se envíe correo y contraseña
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "El correo y la contraseña son obligatorios" });
    }

    // Verificar si ya existe un usuario con ese correo
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Buscar en la tabla Parent
    let parent = await Parent.findOne({ where: { email } });
    if (!parent) {
      // Si no existe, crea un registro en Parent. Usa el valor de 'name' si se proporciona, o un valor por defecto.
      parent = await Parent.create({ email, name: name || "Sin nombre" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con rol "parent"
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "parent",
      parentId: parent.id,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      parentId: parent.id,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para validar el token
router.get("/validate", authenticateJWT, (req, res) => {
  // Suponiendo que el middleware authenticateJWT agrega req.user
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    parentId: user.parentId,
  });
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        parentId: user.parentId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: error.message });
  }
});

// Registro (solo admin)
router.post(
  "/register",
  authenticateJWT,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const { email, password, role, parentId } = req.body;
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }

      const user = await User.create({ email, password, role, parentId });
      res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
