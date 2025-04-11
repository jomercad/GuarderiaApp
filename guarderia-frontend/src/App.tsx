// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListaEstudiantes from "./components/ListaEstudiantes";
import PerfilEstudiante from "./components/PerfilEstudiante";
import RegistroPadres from "./components/RegistroPadres";
import AsistenciaDiaria from "./components/AsistenciaDiaria";
import CrearGrupo from "./components/CrearGrupo";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ListaEstudiantes />} />
          <Route path="/estudiantes/:id" element={<PerfilEstudiante />} />
          <Route path="/padres" element={<RegistroPadres />} />
          <Route path="/grupos" element={<CrearGrupo />} />
          <Route path="/asistencia" element={<AsistenciaDiaria />} />
        </Routes>
      </div>
    </Router>
  );
}
