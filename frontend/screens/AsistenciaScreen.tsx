import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const estudiantes = [
  { id: "1", nombre: "Juan Pérez" },
  { id: "2", nombre: "María Gómez" },
  { id: "3", nombre: "Carlos López" },
];

export default function AsistenciaScreen() {
  const [asistencia, setAsistencia] = useState<Record<string, boolean>>({});

  const toggleAsistencia = (id: string) => {
    setAsistencia((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toma de Asistencia</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Button
              title={asistencia[item.id] ? "Asistió" : "Faltó"}
              onPress={() => toggleAsistencia(item.id)}
            />
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
