// hooks/useGrupos.ts
import { useState } from "react";
import apiClient from "../api/apiClient";
import { Grupo } from "../types/types";

export const useGrupos = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  const fetchGrupos = async () => {
    const { data } = await apiClient.get("/grupos");
    setGrupos(data);
  };

  const crearGrupo = async (grupo: Omit<Grupo, "id">) => {
    const { data } = await apiClient.post("/grupos", grupo);
    setGrupos((prev) => [...prev, data]);
  };

  return { grupos, fetchGrupos, crearGrupo };
};
