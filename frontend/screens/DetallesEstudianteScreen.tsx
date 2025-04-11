import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetallesEstudianteScreen({ route }) {
  const { estudiante } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Estudiante</Text>
      <Text style={styles.label}>Nombre: {estudiante.nombre}</Text>
      <Text style={styles.label}>Género: {estudiante.genero}</Text>
      <Text style={styles.label}>
        Fecha de Nacimiento: {estudiante.fechaNacimiento}
      </Text>
      <Text style={styles.label}>
        Alergias: {estudiante.alergias.join(", ")}
      </Text>

      <Text style={styles.subtitle}>Padres:</Text>
      {estudiante.padres.map((padre, index) => (
        <View key={index} style={styles.padreContainer}>
          <Text style={styles.label}>Nombre: {padre.nombre}</Text>
          <Text style={styles.label}>Teléfono: {padre.telefono}</Text>
          <Text style={styles.label}>Correo: {padre.correo}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  padreContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});
