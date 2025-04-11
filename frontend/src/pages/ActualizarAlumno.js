import React, { useState } from 'react';
import axios from 'axios';

function ActualizarAlumno() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('Masculino'); // Valor por defecto
  const [padreId, setPadreId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualizar un alumno
    axios.put(`http://127.0.0.1:8000/alumnos/actualizar/${id}/`, {
      nombre: nombre,
      edad: edad,
      genero: genero,
      padre_id: padreId
    })
      .then(response => {
        console.log('Alumno actualizado:', response.data);
        alert('Alumno actualizado con éxito');
      })
      .catch(error => {
        console.error('Error actualizando alumno:', error);
        alert('Hubo un error al actualizar el alumno');
      });
  };

  return (
    <div>
      <h1>Actualizar Alumno</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID del Alumno:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </label>
        <label>
          Género:
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
        <label>
          ID del Padre:
          <input
            type="number"
            value={padreId}
            onChange={(e) => setPadreId(e.target.value)}
          />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default ActualizarAlumno;