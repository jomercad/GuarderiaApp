import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListaAlumnos from './pages/ListaAlumnos';
import CrearAlumno from './pages/CrearAlumno';
import EliminarAlumno from './pages/EliminarAlumno';
import ActualizarAlumno from './pages/ActualizarAlumno';
import ListaPadres from './pages/ListaPadres';
import ListaActividades from './pages/ListaActividades';
import TomarAsistencia from './pages/TomarAsistencia';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Alumnos</Link>
            </li>
            <li>
              <Link to="/crear">Crear Alumno</Link>
            </li>
            <li>
              <Link to="/eliminar">Eliminar Alumno</Link>
            </li>
            <li>
              <Link to="/actualizar">Actualizar Alumno</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ListaAlumnos />} />
          <Route path="/crear" element={<CrearAlumno />} />
          <Route path="/eliminar" element={<EliminarAlumno />} />
          <Route path="/actualizar" element={<ActualizarAlumno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;