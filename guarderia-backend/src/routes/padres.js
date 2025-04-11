// routes/padres.js
const express = require("express");
const { crearPadre } = require("../controllers/padreController");

const router = express.Router();

router.post("/", crearPadre);

module.exports = router;
