// backend/routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Registrar asistencia para un grupo en una fecha determinada
router.post("/", async (req, res) => {
  try {
    const { date, groupId, attendances } = req.body;
    // 'attendances' es un arreglo de objetos: { studentId, present }
    const results = [];
    for (const att of attendances) {
      const record = await db.Attendance.create({
        date,
        groupId,
        studentId: att.studentId,
        present: att.present,
      });
      results.push(record);
    }
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar asistencia por grupo y fecha
router.get("/", async (req, res) => {
  try {
    const { date, groupId } = req.query;
    const records = await db.Attendance.findAll({
      where: { date, groupId },
      include: [{ model: db.Student, as: "student" }],
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
