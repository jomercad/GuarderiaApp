import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ListaEstudiantesScreen({ navigation }) {
  const [estudiantes, setEstudiantes] = useState([]);

  // Obtener la lista de estudiantes desde el backend
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.19:5000/api/estudiantes"
        );
        const data = await response.json();
        setEstudiantes(data);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    };

    fetchEstudiantes();
  }, []);

  // Navegar a la pantalla de detalles del estudiante
  const handleSeleccionarEstudiante = (estudiante) => {
    navigation.navigate("DetallesEstudiante", { estudiante });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Estudiantes</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSeleccionarEstudiante(item)}
          >
            <Text style={styles.itemText}>{item.nombre}</Text>
          </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
});
