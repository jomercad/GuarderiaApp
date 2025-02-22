// backend/models/group.js
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true, // Validar que no esté vacío
        },
      },
      criteria: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true, // No se pluraliza automáticamente
      tableName: "groups", // Usa este nombre exacto
    }
  );
  return Group;
};
