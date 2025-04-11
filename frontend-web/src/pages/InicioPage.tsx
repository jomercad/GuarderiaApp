import React from "react";
import { Link } from "react-router-dom";
import "../styles/InicioPage.css"; // Crearemos este archivo después

const InicioPage = () => {
  const funcionalidades = [
    { titulo: "Registro de Estudiantes", ruta: "/registro" },
    { titulo: "Lista de Estudiantes", ruta: "/lista" },
    { titulo: "Crear Grupo", ruta: "/crear-grupo" },
    { titulo: "Toma de Asistencia", ruta: "/asistencia" },
    { titulo: "Reportes", ruta: "/reportes" },
    { titulo: "Calendario", ruta: "/calendario" },
  ];

  return (
    <div className="inicio-container">
      <h1 className="inicio-titulo">Bienvenido a la Guardería</h1>
      <div className="grid-botones">
        {funcionalidades.map((item, index) => (
          <Link key={index} to={item.ruta} className="boton-funcionalidad">
            {item.titulo}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InicioPage;
