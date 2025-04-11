import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Estudiante {
  _id: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
}

const ListaEstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      const response = await api.get("/estudiantes");
      setEstudiantes(response.data);
    };
    fetchEstudiantes();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Estudiantes</h1>
      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante._id}>
            <Link to={`/estudiantes/${estudiante._id}`}>
              {estudiante.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEstudiantesPage;
