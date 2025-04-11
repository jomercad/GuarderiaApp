import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/actividades/')
      .then(response => {
        setActividades(response.data);
      })
      .catch(error => {
        console.error('Error fetching actividades:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Actividades</h1>
      <ul>
        {actividades.map(actividad => (
          <li key={actividad.id}>
            {actividad.titulo} - {new Date(actividad.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaActividades;