// backend/models/parent.js
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define(
    "Parent",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{10}$/, // Validar que sea un número de 10 dígitos
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "parents",
    }
  );

  // Relación con Student (muchos-a-muchos)
  Parent.associate = (models) => {
    Parent.belongsToMany(models.Student, {
      through: models.StudentParent,
      as: "students",
      foreignKey: "parentId",
      otherKey: "studentId",
    });
  };

  return Parent;
};
