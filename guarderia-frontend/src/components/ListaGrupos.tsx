import { useQuery } from "react-query";
import axios from "axios";
import { Grupo } from "../types/grupo";
import { Link } from "react-router-dom";

export default function ListaGrupos() {
  const { data: grupos } = useQuery<Grupo[]>("grupos", () =>
    axios.get("/api/grupos").then((res) => res.data)
  );

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-4">
        {grupos?.map((grupo) => (
          <div key={grupo.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">{grupo.nombre}</h3>
            <p>Criterio: {grupo.criterio}</p>
            <Link
              to={`/grupos/${grupo.id}`}
              className="mt-2 inline-block text-blue-600 hover:text-blue-800"
            >
              Ver detalles →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
