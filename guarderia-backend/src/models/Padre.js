module.exports = (sequelize, DataTypes) => {
  const Padre = sequelize.define("Padre", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: DataTypes.STRING,
    correo: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
  });

  Padre.associate = (models) => {
    Padre.hasMany(models.Estudiante, { foreignKey: "padreId" });
  };

  return Padre;
};
