require("dotenv").config();

// backend/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const path = require("path");

// Middlewares
app.use(
  cors({
    origin: [
      "https://guarderia-app-v1-7f64fda9ccf0.herokuapp.com/",
      "http://localhost:3000",
    ], // Ajusta según sea necesario
  })
);
app.use(express.json());

// Importar rutas
const parentRoutes = require("./routes/parentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const groupRoutes = require("./routes/groupRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const testDbRoutes = require("./routes/testDB");

app.use("/api/parents", parentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/test-db", testDbRoutes);

if (process.env.NODE_ENV === "production") {
  // Sirve los archivos estáticos desde el build de React
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Para cualquier ruta que no sea de la API, envía el index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada con modificaciones en las tablas.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
