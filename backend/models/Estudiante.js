const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  alergias: { type: [String], default: [] },
  padres: [
    {
      nombre: { type: String, required: true },
      telefono: { type: String, required: true },
      correo: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
