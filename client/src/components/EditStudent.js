// frontend/src/components/EditStudent.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [student, setStudent] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    allergies: "",
    parents: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) navigate("/login");
          throw new Error("Error al cargar datos del estudiante");
        }

        const data = await response.json();

        // Verificar acceso para padres
        if (user?.role === "parent") {
          const isAuthorized = data.parents.some(
            (parent) => parent.id === user.parentId
          );
          if (!isAuthorized) {
            navigate("/students");
            return;
          }
        }

        setStudent({
          ...data,
          dateOfBirth: data.dateOfBirth.split("T")[0], // Formatear fecha para input
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...student,
          dateOfBirth: new Date(student.dateOfBirth).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar");
      }

      setSuccess("Estudiante actualizado correctamente");
      setTimeout(() => navigate(`/student/${id}`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "teacher", "parent"]}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Editar Estudiante
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  required
                  disabled={user?.role === "parent"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de nacimiento"
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                  disabled={user?.role === "parent"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Género"
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                  disabled={user?.role === "parent"}
                >
                  <option value="">Seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alergias o condiciones especiales"
                  name="allergies"
                  value={student.allergies}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>

              {(user?.role === "admin" || user?.role === "teacher") && (
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Guardar Cambios
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ProtectedRoute>
  );
}

export default EditStudent;
