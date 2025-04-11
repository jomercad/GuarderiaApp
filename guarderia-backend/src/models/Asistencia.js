module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define("Asistencia", {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    presente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Asistencia.associate = (models) => {
    Asistencia.belongsTo(models.Estudiante, { foreignKey: "estudianteId" });
    Asistencia.belongsTo(models.Grupo, { foreignKey: "grupoId" });
  };

  return Asistencia;
};
