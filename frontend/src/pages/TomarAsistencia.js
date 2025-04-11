import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TomarAsistencia() {
  const { alumnoId } = useParams();
  const [fecha, setFecha] = useState('');
  const [presente, setPresente] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/asistencia/', {
      alumno: alumnoId,
      fecha: fecha,
      presente: presente
    })
    .then(response => {
      alert('Asistencia registrada con éxito');
    })
    .catch(error => {
      console.error('Error registrando asistencia:', error);
    });
  };

  return (
    <div>
      <h1>Tomar Asistencia</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </label>
        <label>
          Presente:
          <input type="checkbox" checked={presente} onChange={(e) => setPresente(e.target.checked)} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default TomarAsistencia;