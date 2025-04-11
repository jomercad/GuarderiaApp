const express = require("express");
const {
  crearGrupo,
  asignarEstudiantesAGrupo,
} = require("../controllers/grupoController");

const router = express.Router();

router.post("/", crearGrupo);
router.post("/:grupoId/estudiantes", asignarEstudiantesAGrupo);

module.exports = router;
