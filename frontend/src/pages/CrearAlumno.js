import React, { useState } from 'react';
import axios from 'axios';

function CrearAlumno() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('Masculino'); // Valor por defecto
  const [padreId, setPadreId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo alumno
    axios.post('http://127.0.0.1:8000/alumnos/crear/', {
      nombre: nombre,
      edad: edad,
      genero: genero,
      padre_id: padreId
    })
      .then(response => {
        console.log('Alumno creado:', response.data);
        alert('Alumno creado con éxito');
      })
      .catch(error => {
        console.error('Error creando alumno:', error);
        alert('Hubo un error al crear el alumno');
      });
  };

  return (
    <div>
      <h1>Crear Alumno</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
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
            required
          />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CrearAlumno;