const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");

router.post("/", estudianteController.crearEstudiante);
router.get("/", estudianteController.obtenerEstudiantes);

module.exports = router;
