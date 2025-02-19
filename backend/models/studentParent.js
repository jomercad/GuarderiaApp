// backend/models/studentParent.js
module.exports = (sequelize, DataTypes) => {
  const StudentParent = sequelize.define(
    "StudentParent",
    {
      studentId: { type: DataTypes.INTEGER, primaryKey: true },
      parentId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      freezeTableName: true,
      tableName: "student_parents",
      timestamps: true, // Agregar esto si necesitas createdAt y updatedAt
    }
  );
  return StudentParent;
};
