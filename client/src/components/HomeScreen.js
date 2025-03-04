// frontend/src/components/HomeScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido al Jardín Infantil Mundo de los Niños
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Seleccione una opción:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/registration")}
        >
          Registro de Estudiantes
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/students")}
        >
          Lista de Estudiantes
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/groups")}
        >
          Gestión de Grupos
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/attendance")}
        >
          Toma de Asistencia
        </Button>
      </Box>
    </Container>
  );
}

export default HomeScreen;
