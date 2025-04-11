// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");

// Elimina la URL de respaldo de AWS RDS para evitar conflictos
const connectionString = process.env.DATABASE_URL; // Solo Heroku

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    // Añade esto para conexiones Pooling en Heroku
    keepAlive: true,
  },
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

// Importar modelo de relación Student-Parent
db.StudentParent = require("./studentParent")(sequelize, DataTypes);

// Nuevo modelo de Usuario
db.User = require("./user")(sequelize, DataTypes);

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

module.exports = db;
