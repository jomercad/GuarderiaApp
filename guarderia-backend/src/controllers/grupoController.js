const { Grupo, Estudiante } = require("../models");

exports.crearGrupo = async (req, res) => {
  try {
    const { nombre, criterio, estudianteIds } = req.body;

    const grupo = await Grupo.create({ nombre, criterio });

    if (estudianteIds && estudianteIds.length > 0) {
      await grupo.addEstudiantes(estudianteIds);
    }

    res.status(201).json(grupo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.asignarEstudiantesAGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;
    const { estudianteIds } = req.body;

    const grupo = await Grupo.findByPk(grupoId);
    if (!grupo) throw new Error("Grupo no encontrado");

    await grupo.addEstudiantes(estudianteIds);
    res.json({ message: "Estudiantes asignados correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
