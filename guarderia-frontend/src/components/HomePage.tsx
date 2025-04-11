import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Sistema de Gestión de Guardería
      </h1>
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Link
          to="/registro"
          className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200"
        >
          Registrar Nuevo Estudiante
        </Link>
        <Link
          to="/asistencia"
          className="p-4 bg-green-100 rounded-lg hover:bg-green-200"
        >
          Tomar Asistencia
        </Link>
      </div>
    </div>
  );
}
