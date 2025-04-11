import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    // Obtener la lista de alumnos
    axios.get('http://127.0.0.1:8000/alumnos/')
      .then(response => {
        setAlumnos(response.data);
      })
      .catch(error => {
        console.error('Error obteniendo la lista de alumnos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <ul>
        {alumnos.map(alumno => (
          <li key={alumno.id}>
            {alumno.nombre} - {alumno.edad} años ({alumno.genero}) - Padre: {alumno.padre__nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAlumnos;