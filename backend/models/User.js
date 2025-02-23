// backend/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "maestro", "padre"),
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "parents",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "users",
    }
  );
  return User;
};
