module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define("Grupo", {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    criterio: DataTypes.STRING, // Ej: "3-4 años", "Arte"
  });

  Grupo.associate = (models) => {
    Grupo.belongsToMany(models.Estudiante, { through: "GrupoEstudiante" });
    Grupo.hasMany(models.Asistencia, { foreignKey: "grupoId" });
  };

  return Grupo;
};
