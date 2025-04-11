const express = require("express");
const {
  registrarAsistencia,
  obtenerAsistenciasPorGrupo,
} = require("../controllers/asistenciaController");

const router = express.Router();

router.post("/", registrarAsistencia);
router.get("/", obtenerAsistenciasPorGrupo);

module.exports = router;
