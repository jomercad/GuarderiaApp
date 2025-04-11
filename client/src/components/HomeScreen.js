// frontend/src/components/HomeScreen.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Si no hay usuario autenticado, mostrar solo la opción de autenticarse
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido al Jardín Infantil Mundo de los Niños
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Por favor, inicie sesión para continuar.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/auth")}>
          Iniciar Sesión / Registro
        </Button>
      </Container>
    );
  }

  // Opciones según rol
  let options;
  if (user.role === "admin") {
    options = (
      <>
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
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/admin")}
        >
          Administración del Sistema
        </Button>
      </>
    );
  } else if (user.role === "maestro") {
    options = (
      <>
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
          onClick={() => navigate("/attendance")}
        >
          Toma de Asistencia
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/groups")}
        >
          Gestión de Grupos
        </Button>
      </>
    );
  } else if (user.role === "padre") {
    options = (
      <>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/students")}
        >
          Mis Hijos
        </Button>
      </>
    );
  } else {
    // Caso por defecto (si llegara a existir otro rol)
    options = (
      <>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/students")}
        >
          Lista de Estudiantes
        </Button>
      </>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido al Jardín Infantil Mundo de los Niños
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {`Bienvenido, ${user.email} (${user.role})`}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Seleccione una opción:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {options}
      </Box>
    </Container>
  );
}

export default HomeScreen;
