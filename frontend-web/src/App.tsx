import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InicioPage from "./pages/InicioPage";
import RegistroEstudiantePage from "./pages/RegistroEstudiantePage";
import ListaEstudiantesPage from "./pages/ListaEstudiantesPage";
import DetallesEstudiantePage from "./pages/DetallesEstudiantePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/registro" element={<RegistroEstudiantePage />} />
        <Route path="/lista" element={<ListaEstudiantesPage />} />
        <Route path="/estudiantes/:id" element={<DetallesEstudiantePage />} />
        {/* Agrega más rutas según las funcionalidades */}
      </Routes>
    </Router>
  );
}

export default App;
