// types/types.ts
export interface Padre {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  estudiantes: Estudiante[];
}

export interface Estudiante {
  id: number;
  nombre: string;
  fechaNacimiento: string;
  genero: "Masculino" | "Femenino" | "Otro";
  alergias?: string;
  padreId: number;
  grupoIds?: number[];
}

export interface Grupo {
  id: number;
  nombre: string;
  criterio: string;
  estudiantes: Estudiante[];
}

export interface Asistencia {
  id: number;
  fecha: string;
  presente: boolean;
  estudianteId: number;
  grupoId: number;
}
