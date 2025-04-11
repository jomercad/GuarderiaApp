const express = require("express");
const sequelize = require("./config/database");
const app = express();

// Importar rutas
const padresRouter = require("./routes/padres");
const gruposRouter = require("./routes/grupos");
const asistenciasRouter = require("./routes/asistencias");

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/padres", padresRouter);
app.use("/api/grupos", gruposRouter);
app.use("/api/asistencias", asistenciasRouter);

// Sincronizar BD y arrancar servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
  });
});
