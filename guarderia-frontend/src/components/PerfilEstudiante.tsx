// components/PerfilEstudiante.tsx
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Estudiante } from "../types/types";

export default function PerfilEstudiante() {
  const { id } = useParams<{ id: string }>();
  const {
    data: estudiante,
    loading,
    error,
  } = useFetch<Estudiante>(`/estudiantes/${id}`);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{estudiante?.nombre}</h1>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Fecha de nacimiento:</span>{" "}
          {estudiante?.fechaNacimiento}
        </p>
        <p>
          <span className="font-semibold">Género:</span> {estudiante?.genero}
        </p>
        <p>
          <span className="font-semibold">Alergias:</span>{" "}
          {estudiante?.alergias || "Ninguna"}
        </p>
      </div>
    </div>
  );
}
