import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RegistroEstudiantesScreen() {
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [alergias, setAlergias] = useState("");
  const [padres, setPadres] = useState([
    { nombre: "", telefono: "", correo: "" },
    { nombre: "", telefono: "", correo: "" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFechaVisible, setModalFechaVisible] = useState(false);
  const generos = ["Masculino", "Femenino", "Otro"];

  const handleDateChange = (event, selectedDate) => {
    setModalFechaVisible(false);
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };

  const limpiarFormulario = () => {
    setNombreEstudiante("");
    setGenero("");
    setFechaNacimiento(new Date());
    setAlergias("");
    setPadres([
      { nombre: "", telefono: "", correo: "" },
      { nombre: "", telefono: "", correo: "" },
    ]);
  };

  const handleRegistro = async () => {
    const estudiante = {
      nombre: nombreEstudiante,
      genero,
      fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
      alergias: alergias.split(","),
      padres,
    };

    try {
      const response = await fetch("http://192.168.1.19:5000/api/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Estudiante registrado correctamente");
        limpiarFormulario();
      } else {
        Alert.alert("Error", "Error al registrar el estudiante");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Error de conexión");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre del Estudiante"
          value={nombreEstudiante}
          onChangeText={setNombreEstudiante}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerButtonText}>
            {genero || "Seleccionar género"}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {generos.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    setGenero(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalFechaVisible(true)}
        >
          <Text style={styles.pickerButtonText}>
            {fechaNacimiento.toLocaleDateString() ||
              "Seleccionar fecha de nacimiento"}
          </Text>
        </TouchableOpacity>

        {modalFechaVisible && (
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          placeholder="Alergias (separadas por comas)"
          value={alergias}
          onChangeText={setAlergias}
          style={styles.input}
        />

        {padres.map((padre, index) => (
          <View key={index} style={styles.padreContainer}>
            <TextInput
              placeholder={`Nombre del Padre ${index + 1}`}
              value={padre.nombre}
              onChangeText={(text) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].nombre = text;
                setPadres(nuevosPadres);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder={`Teléfono del Padre ${index + 1}`}
              value={padre.telefono}
              onChangeText={(text) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].telefono = text;
                setPadres(nuevosPadres);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder={`Correo del Padre ${index + 1}`}
              value={padre.correo}
              onChangeText={(text) => {
                const nuevosPadres = [...padres];
                nuevosPadres[index].correo = text;
                setPadres(nuevosPadres);
              }}
              style={styles.input}
            />
          </View>
        ))}

        <Button title="Registrar" onPress={handleRegistro} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  modalOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
  },
  padreContainer: {
    marginBottom: 16,
  },
});
