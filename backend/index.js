const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const estudianteRoutes = require("./routes/estudianteRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON
app.use("/api/estudiantes", estudianteRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend de la guardería funcionando!");
});

// Iniciar el servidor
//app.listen(PORT, () => {
//  console.log(`Servidor corriendo en http://localhost:${PORT}`);
//});
app.listen(5000, "0.0.0.0", () => {
  console.log("Servidor corriendo en http://0.0.0.0:5000");
});
