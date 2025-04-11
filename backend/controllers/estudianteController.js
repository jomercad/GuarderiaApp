const Estudiante = require("../models/Estudiante");

exports.crearEstudiante = async (req, res) => {
  try {
    const estudiante = new Estudiante(req.body);
    await estudiante.save();
    res.status(201).json(estudiante);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.status(200).json(estudiantes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
