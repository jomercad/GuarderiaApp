// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        // Añade esto para conexiones Pooling en Heroku
        keepAlive: true,
      }
    : {}, // En desarrollo no usa SSL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log, // Habilita temporalmente para ver errores
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Parent = require("./parent")(sequelize, DataTypes);
db.Student = require("./student")(sequelize, DataTypes);
db.Group = require("./group")(sequelize, DataTypes);
db.Attendance = require("./attendance")(sequelize, DataTypes);
db.User = require("./User")(sequelize, DataTypes);

// Importar modelo de relación Student-Parent
db.StudentParent = require("./studentParent")(sequelize, DataTypes);

// Tabla de relación para la relación muchos a muchos entre estudiantes y grupos
db.GroupStudent = sequelize.define(
  "GroupStudent",
  {},
  {
    tableName: "group_students", // Nombre fijo en snake_case
    timestamps: false,
  }
);

// Relaciones
// 1. Relación M:N entre Student y Parent (usando StudentParent)
db.Student.belongsToMany(db.Parent, {
  through: db.StudentParent,
  as: "parents",
  foreignKey: "studentId",
});

db.Parent.belongsToMany(db.Student, {
  through: db.StudentParent,
  as: "students",
  foreignKey: "parentId",
});

// 2. Relación M:N entre Student y Group (usando GroupStudent)
db.Student.belongsToMany(db.Group, {
  through: db.GroupStudent,
  as: "groups",
  foreignKey: "studentId",
});

db.Group.belongsToMany(db.Student, {
  through: db.GroupStudent,
  as: "students",
  foreignKey: "groupId",
});

// 3. Relaciones de Asistencia (correctas)
db.Attendance.belongsTo(db.Student, {
  foreignKey: "studentId",
  as: "student", // Cambiar a singular
});

db.Student.hasMany(db.Attendance, {
  foreignKey: "studentId",
  as: "attendances",
});

db.Attendance.belongsTo(db.Group, {
  foreignKey: "groupId",
  as: "group",
});

db.Group.hasMany(db.Attendance, {
  foreignKey: "groupId",
  as: "attendances",
});

// Relación User-Parent
db.User.belongsTo(db.Parent, { foreignKey: "parentId" });
db.Parent.hasOne(db.User, { foreignKey: "parentId" });

module.exports = db;
