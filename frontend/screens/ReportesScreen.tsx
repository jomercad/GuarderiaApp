import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Picker } from "react-native";

// Datos de ejemplo para actividades
const actividades = [
  {
    id: "1",
    estudiante: "Juan Pérez",
    grupo: "Grupo A",
    actividad: "Dibujo",
    fecha: "2023-10-01",
  },
  {
    id: "2",
    estudiante: "María Gómez",
    grupo: "Grupo B",
    actividad: "Lectura",
    fecha: "2023-10-02",
  },
  {
    id: "3",
    estudiante: "Carlos López",
    grupo: "Grupo A",
    actividad: "Música",
    fecha: "2023-10-03",
  },
];

// Datos de ejemplo para estudiantes y grupos
const estudiantes = ["Juan Pérez", "María Gómez", "Carlos López"];
const grupos = ["Grupo A", "Grupo B"];

export default function ReportesScreen() {
  const [filtroEstudiante, setFiltroEstudiante] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");

  const actividadesFiltradas = actividades.filter((actividad) => {
    return (
      (filtroEstudiante === "" || actividad.estudiante === filtroEstudiante) &&
      (filtroGrupo === "" || actividad.grupo === filtroGrupo)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte de Actividades</Text>

      {/* Filtro por Estudiante */}
      <View style={styles.filtroContainer}>
        <Text>Filtrar por Estudiante:</Text>
        <Picker
          selectedValue={filtroEstudiante}
          onValueChange={(itemValue) => setFiltroEstudiante(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Todos" value="" />
          {estudiantes.map((estudiante) => (
            <Picker.Item
              key={estudiante}
              label={estudiante}
              value={estudiante}
            />
          ))}
        </Picker>
      </View>

      {/* Filtro por Grupo */}
      <View style={styles.filtroContainer}>
        <Text>Filtrar por Grupo:</Text>
        <Picker
          selectedValue={filtroGrupo}
          onValueChange={(itemValue) => setFiltroGrupo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Todos" value="" />
          {grupos.map((grupo) => (
            <Picker.Item key={grupo} label={grupo} value={grupo} />
          ))}
        </Picker>
      </View>

      {/* Lista de Actividades */}
      <FlatList
        data={actividadesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Estudiante: {item.estudiante}</Text>
            <Text style={styles.itemText}>Grupo: {item.grupo}</Text>
            <Text style={styles.itemText}>Actividad: {item.actividad}</Text>
            <Text style={styles.itemText}>Fecha: {item.fecha}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filtroContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});
