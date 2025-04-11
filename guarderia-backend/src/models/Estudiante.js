module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define("Estudiante", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("Masculino", "Femenino", "Otro"),
      allowNull: false,
    },
    alergias: DataTypes.TEXT,
    padreId: {
      type: DataTypes.INTEGER,
      references: { model: "Padres", key: "id" },
    },
  });

  Estudiante.associate = (models) => {
    Estudiante.belongsTo(models.Padre, { foreignKey: "padreId" });
    Estudiante.belongsToMany(models.Grupo, { through: "GrupoEstudiante" });
    Estudiante.hasMany(models.Asistencia, { foreignKey: "estudianteId" });
  };

  return Estudiante;
};
