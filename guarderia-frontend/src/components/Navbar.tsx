// components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Guardería App
        </Link>
        <div className="space-x-4">
          <Link to="/padres" className="hover:text-blue-200">
            Padres
          </Link>
          <Link to="/grupos" className="hover:text-blue-200">
            Grupos
          </Link>
          <Link to="/asistencia" className="hover:text-blue-200">
            Asistencia
          </Link>
        </div>
      </div>
    </nav>
  );
}
