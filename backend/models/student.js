// backend/models/student.js
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true, // Validar que sea una fecha válida
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["Male", "Female", "Other"]], // Validar valores permitidos
        },
      },
      allergies: { type: DataTypes.TEXT },
    },
    {
      freezeTableName: true,
      tableName: "students",
    }
  );

  // Relación con Parent (muchos-a-muchos)
  Student.associate = (models) => {
    Student.belongsToMany(models.Parent, {
      through: db.StudentParent,
      as: "parents",
      foreignKey: "studentId",
      otherKey: "parentId",
    });
  };

  return Student;
};
