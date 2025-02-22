const express = require("express");
const router = express.Router();
const db = require("../models");
const { authenticateJWT, authorizeRoles } = require("../middlewares/auth");

// Crear estudiante (solo admin y teacher)
router.post(
  "/",
  authenticateJWT,
  authorizeRoles(["admin", "teacher"]),
  async (req, res) => {
    try {
      const { name, dateOfBirth, gender, allergies, parents } = req.body;

      if (!name || !dateOfBirth) {
        return res
          .status(400)
          .json({ error: "Nombre y fecha de nacimiento son requeridos" });
      }

      const student = await db.Student.create({
        name,
        dateOfBirth: new Date(dateOfBirth).toISOString().split("T")[0],
        gender,
        allergies,
      });

      if (parents && parents.length > 0) {
        const parentRecords = await Promise.all(
          parents
            .filter((p) => p.name && p.email)
            .map(async (parent) => {
              const [record] = await db.Parent.findOrCreate({
                where: { email: parent.email },
                defaults: {
                  name: parent.name,
                  phone: parent.phone || null,
                  email: parent.email,
                },
              });
              return record;
            })
        );

        // Asociar padres al estudiante
        if (parentRecords.length > 0) await student.setParents(parentRecords);
      }

      // Obtener el estudiante con sus relaciones
      const studentWithRelations = await db.Student.findByPk(student.id, {
        include: [db.Parent, db.Group, db.Attendance],
      });

      res.status(201).json(studentWithRelations);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Error en el servidor", details: error.message });
    }
  }
);

// Listar estudiantes (acceso diferenciado)
router.get(
  "/",
  authenticateJWT,
  authorizeRoles(["admin", "teacher", "parent"]), // <-- Añade esto
  async (req, res) => {
    try {
      // Padres solo ven sus estudiantes
      if (req.user.role === "parent") {
        const parent = await db.Parent.findByPk(req.user.parentId, {
          include: [{ model: db.Student, as: "students" }],
        });
        console.log("Padre encontrado:", parent?.id);
        console.log("Estudiantes asociados:", parent?.Students?.length);
        return res.json(parent.Students);
      }

      // Admin/teacher ven todos
      const students = await db.Student.findAll({
        include: [{ model: db.Parent, as: "parents" }],
      });
      res.json(students);
    } catch (error) {
      console.error("Error en GET /api/students:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Obtener estudiante específico
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id, {
      include: [db.Parent, db.Group, db.Attendance],
    });

    if (!student)
      return res.status(404).json({ error: "Estudiante no encontrado" });

    // Verificar acceso para padres
    if (req.user.role === "parent") {
      const isAuthorized = await student.hasParent(req.user.parentId);
      if (!isAuthorized)
        return res.status(403).json({ error: "Acceso no autorizado" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estudiante (admin/teacher)
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles(["admin", "teacher"]),
  async (req, res) => {
    try {
      const { name, dateOfBirth, gender, allergies, parents } = req.body;
      const student = await db.Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }

      // Actualizar datos del estudiante
      student.name = name;
      student.dateOfBirth = dateOfBirth;
      student.gender = gender;
      student.allergies = allergies;
      await student.save();

      // Actualizar padres (si se proporcionan)
      if (parents && parents.length > 0) {
        const parentRecords = await Promise.all(
          parents
            .filter((p) => p.name && p.email) // Solo padres válidos
            .map(async (parent) => {
              const [record] = await db.Parent.findOrCreate({
                where: { email: parent.email },
                defaults: {
                  name: parent.name,
                  phone: parent.phone || null,
                  email: parent.email,
                },
              });
              return record;
            })
        );

        // Asociar nuevos padres al estudiante
        await student.setParents(parentRecords);
      }

      res.json(student);
    } catch (error) {
      console.error("Error en GET /api/students:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Eliminar estudiante (solo admin)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const student = await db.Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
      await student.destroy();
      res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error("Error en GET /api/students:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
