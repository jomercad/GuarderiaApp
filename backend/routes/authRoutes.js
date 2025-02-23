// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models"); // Incluye User y Parent

// Ruta de registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Email, password y role son requeridos" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    let parentId = null;
    if (role === "padre") {
      // Verificar que exista un registro en la tabla de padres con el mismo email
      const parentRecord = await db.Parent.findOne({ where: { email } });
      if (!parentRecord) {
        return res
          .status(400)
          .json({ error: "No se encontró registro de padre con ese email" });
      }
      parentId = parentRecord.id;
    }

    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      role,
      parentId,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Payload del token incluye id, email, rol y parentId (si aplica)
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      parentId: user.parentId,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Se envía el token y la información de rol para uso en el frontend
    res.json({ token, role: user.role, parentId: user.parentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
