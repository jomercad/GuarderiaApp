module.exports = (sequelize, DataTypes) => {
  const GrupoEstudiante = sequelize.define("GrupoEstudiante", {
    GrupoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    EstudianteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });

  return GrupoEstudiante;
};
