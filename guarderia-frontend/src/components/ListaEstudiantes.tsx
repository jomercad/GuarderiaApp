// components/ListaEstudiantes.tsx
import { useFetch } from "../hooks/useFetch";
import { Estudiante } from "../types/types";
import { Link } from "react-router-dom";

export default function ListaEstudiantes() {
  const {
    data: estudiantes,
    loading,
    error,
  } = useFetch<Estudiante[]>("/estudiantes");

  if (loading) return <div>Cargando estudiantes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 p-4">
      {estudiantes?.map((est) => (
        <Link
          key={est.id}
          to={`/estudiantes/${est.id}`}
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h3 className="font-bold">{est.nombre}</h3>
          <p>
            Edad:{" "}
            {new Date().getFullYear() -
              new Date(est.fechaNacimiento).getFullYear()}
          </p>
        </Link>
      ))}
    </div>
  );
}
