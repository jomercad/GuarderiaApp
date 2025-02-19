// backend/models/attendance.js
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      present: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true, // No se pluraliza automáticamente
      tableName: "attendances", // Usa este nombre exacto
    }
  );
  return Attendance;
};
