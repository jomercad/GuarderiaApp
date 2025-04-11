import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

export default function CrearGrupoScreen() {
  const [nombreGrupo, setNombreGrupo] = useState("");

  const handleCrearGrupo = () => {
    console.log("Grupo creado:", nombreGrupo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Grupo</Text>
      <TextInput
        placeholder="Nombre del Grupo"
        value={nombreGrupo}
        onChangeText={setNombreGrupo}
        style={styles.input}
      />
      <Button title="Crear Grupo" onPress={handleCrearGrupo} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});
