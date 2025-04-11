import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../services/api";

interface Padre {
  nombre: string;
  telefono: string;
  correo: string;
}

const RegistroEstudiantePage = () => {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(new Date());
  const [alergias, setAlergias] = useState("");
  const [padres, setPadres] = useState<Padre[]>([
    { nombre: "", telefono: "", correo: "" },
    { nombre: "", telefono: "", correo: "" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/estudiantes", {
        nombre,
        genero,
        fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
        alergias: alergias.split(","),
        padres,
      });
      alert("Estudiante registrado correctamente");
      // Limpiar formulario
      setNombre("");
      setGenero("");
      setFechaNacimiento(new Date());
      setAlergias("");
      setPadres([
        { nombre: "", telefono: "", correo: "" },
        { nombre: "", telefono: "", correo: "" },
      ]);
    } catch (error) {
      alert("Error al registrar el estudiante");
    }
  };

  return (
    <div className="container">
      <h1>Registro de Estudiante</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Estudiante</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Género</label>
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <DatePicker
            selected={fechaNacimiento}
            onChange={(date: Date | null) => {
              if (date !== null) {
                setFechaNacimiento(date);
              }
            }}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="form-group">
          <label>Alergias (separadas por comas)</label>
          <input
            type="text"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
          />
        </div>

        {padres.map((padre, index) => (
          <div key={index} className="padre-form">
            <h3>Padre {index + 1}</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={padre.nombre}
              onChange={(e) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].nombre = e.target.value;
                setPadres(nuevosPadres);
              }}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={padre.telefono}
              onChange={(e) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].telefono = e.target.value;
                setPadres(nuevosPadres);
              }}
              required
            />
            <input
              type="email"
              placeholder="Correo"
              value={padre.correo}
              onChange={(e) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].correo = e.target.value;
                setPadres(nuevosPadres);
              }}
              required
            />
          </div>
        ))}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroEstudiantePage;
