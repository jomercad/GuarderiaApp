// components/RegistroPadres.tsx
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

type FormData = {
  padre: {
    nombre: string;
    correo: string;
    telefono: string;
  };
  estudiantes: Array<{
    nombre: string;
    fechaNacimiento: Date;
    genero: string;
    alergias: string;
  }>;
};

export default function RegistroPadres() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Transformar fechas a formato ISO
    const payload = {
      ...data.padre,
      estudiantes: data.estudiantes.map((est) => ({
        ...est,
        fechaNacimiento: est.fechaNacimiento.toISOString(),
      })),
    };

    await axios.post("/api/padres", payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del padre */}
      <Controller
        name="padre.nombre"
        control={control}
        render={({ field }) => (
          <input {...field} placeholder="Nombre del padre" />
        )}
      />

      {/* Lista dinámica de estudiantes */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`estudiantes.${index}.fechaNacimiento`}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        </div>
      ))}
    </form>
  );
}
