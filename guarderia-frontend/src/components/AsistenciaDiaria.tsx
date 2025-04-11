// components/AsistenciaDiaria.tsx
export default function AsistenciaDiaria() {
  const [grupoId, setGrupoId] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const { data: estudiantes } = useFetchEstudiantesPorGrupo(grupoId); // Custom hook

  const handleAsistencia = async (estudianteId: string, presente: boolean) => {
    await axios.post("/api/asistencias", {
      fecha: fecha.toISOString().split("T")[0],
      grupoId,
      registros: [{ estudianteId, presente }],
    });
  };

  return (
    <div>
      <DatePicker selected={fecha} onChange={setFecha} />
      <select onChange={(e) => setGrupoId(e.target.value)}>
        {/* Opciones de grupos desde API */}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {estudiantes?.map((est) => (
          <div key={est.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => handleAsistencia(est.id, e.target.checked)}
            />
            <span>{est.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
