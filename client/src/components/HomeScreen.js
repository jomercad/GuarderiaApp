// frontend/src/components/HomeScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  useTheme,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

function HomeScreen() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <ProtectedRoute>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          mt: 8,
          position: "relative",
        }}
      >
        {/* Header con información del usuario */}
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {user && (
            <>
              <Chip
                label={`Rol: ${user.role}`}
                color="primary"
                variant="outlined"
              />
              <Button
                variant="outlined"
                onClick={logout}
                sx={{ textTransform: "none" }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Box>

        {/* Contenido principal */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
          Bienvenido al Sistema de Gestión Escolar
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {user?.role === "parent"
            ? "Acceso para padres de familia"
            : "Panel de administración educativa"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 6,
            "& > button": {
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 500,
              boxShadow: theme.shadows[2],
              "&:hover": {
                boxShadow: theme.shadows[4],
              },
            },
          }}
        >
          {user?.role !== "parent" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/students")}
              >
                Gestión de Estudiantes
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/groups")}
              >
                Administración de Grupos
              </Button>
            </>
          )}

          {(user?.role === "admin" || user?.role === "teacher") && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "success.main",
                "&:hover": { backgroundColor: "success.dark" },
              }}
              onClick={() => navigate("/attendance")}
            >
              Registro de Asistencia
            </Button>
          )}

          {user?.role === "admin" && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "warning.main",
                "&:hover": { backgroundColor: "warning.dark" },
              }}
              onClick={() => navigate("/admin/users")}
            >
              Administración de Usuarios
            </Button>
          )}

          {user?.role === "parent" && (
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate("/students")}
            >
              Ver Mis Estudiantes
            </Button>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 4,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          Sistema seguro - Versión 1.0.0
        </Typography>
      </Container>
    </ProtectedRoute>
  );
}

export default HomeScreen;
