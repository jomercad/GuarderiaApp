import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/alumnos">Alumnos</Link></li>
        <li><Link to="/padres">Padres</Link></li>
        <li><Link to="/actividades">Actividades</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;