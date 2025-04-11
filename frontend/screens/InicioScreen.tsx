import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Title } from "react-native-paper";

export default function InicioScreen({ navigation }) {
  const funcionalidades = [
    {
      title: "Registro de Estudiantes",
      icon: "account-plus",
      screen: "RegistroEstudiantes",
    },
    {
      title: "Ver Lista de Estudiantes",
      icon: "account-group",
      screen: "ListaEstudiantes",
    },
  ];

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bienvenido a la Guardería</Title>
      <View style={styles.grid}>
        {funcionalidades.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Button
                icon={item.icon}
                mode="contained"
                onPress={() => navigation.navigate(item.screen)}
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                {item.title}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Dos columnas
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 14,
  },
});
