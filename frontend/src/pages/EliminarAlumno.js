import React, { useState } from 'react';
import axios from 'axios';

function EliminarAlumno() {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Eliminar un alumno
    axios.delete(`http://127.0.0.1:8000/alumnos/eliminar/${id}/`)
      .then(response => {
        console.log('Alumno eliminado:', response.data);
        alert('Alumno eliminado con éxito');
      })
      .catch(error => {
        console.error('Error eliminando alumno:', error);
        alert('Hubo un error al eliminar el alumno');
      });
  };

  return (
    <div>
      <h1>Eliminar Alumno</h1>
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
        <button type="submit">Eliminar</button>
      </form>
    </div>
  );
}

export default EliminarAlumno;