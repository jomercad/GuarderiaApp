const { Padre, Estudiante } = require("../models");

exports.crearPadre = async (req, res) => {
  try {
    const { nombre, telefono, correo, estudiantes } = req.body;

    const result = await sequelize.transaction(async (t) => {
      const padre = await Padre.create(
        { nombre, telefono, correo },
        { transaction: t }
      );

      const estudiantesConPadreId = estudiantes.map((est) => ({
        ...est,
        padreId: padre.id,
      }));

      await Estudiante.bulkCreate(estudiantesConPadreId, { transaction: t });
      return padre;
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerPadres = async (req, res) => {
  try {
    const padres = await Padre.findAll({
      include: [{ model: Estudiante }],
    });
    res.json(padres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
