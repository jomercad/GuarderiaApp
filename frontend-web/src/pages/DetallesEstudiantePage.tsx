import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Estudiante {
  _id: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  alergias: string[];
  padres: Array<{
    nombre: string;
    telefono: string;
    correo: string;
  }>;
}

const DetallesEstudiantePage = () => {
  const { id } = useParams<{ id: string }>();
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);

  useEffect(() => {
    const fetchEstudiante = async () => {
      const response = await api.get(`/estudiantes/${id}`);
      setEstudiante(response.data);
    };
    fetchEstudiante();
  }, [id]);

  if (!estudiante) return <div>Cargando...</div>;

  return (
    <div className="container">
      <h1>{estudiante.nombre}</h1>
      <p>Género: {estudiante.genero}</p>
      <p>Fecha de Nacimiento: {estudiante.fechaNacimiento}</p>
      <p>Alergias: {estudiante.alergias.join(", ")}</p>
      <h2>Padres</h2>
      {estudiante.padres.map((padre, index) => (
        <div key={index} className="padre-info">
          <h3>Padre {index + 1}</h3>
          <p>Nombre: {padre.nombre}</p>
          <p>Teléfono: {padre.telefono}</p>
          <p>Correo: {padre.correo}</p>
        </div>
      ))}
    </div>
  );
};

export default DetallesEstudiantePage;
