import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaPadres() {
  const [padres, setPadres] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/padres/')
      .then(response => {
        setPadres(response.data);
      })
      .catch(error => {
        console.error('Error fetching padres:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Padres</h1>
      <ul>
        {padres.map(padre => (
          <li key={padre.id}>
            {padre.nombre} - {padre.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPadres;