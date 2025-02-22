// frontend/src/components/RegistrationForm.js
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function RegistrationForm() {
  // Estado para 2 padres
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [parents, setParents] = useState([
    { name: "", phone: "", email: "" }, // Padre 1
    { name: "", phone: "", email: "" }, // Padre 2
  ]);
  // Estado del estudiante
  const [student, setStudent] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    allergies: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los padres
  const handleParentChange = (parentIndex, e) => {
    const newParents = parents.map((parent, index) =>
      index === parentIndex
        ? { ...parent, [e.target.name]: e.target.value }
        : parent
    );
    setParents(newParents);
  };

  // Manejar cambios en el estudiante
  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Validar datos básicos del estudiante
      if (!student.name || !student.dateOfBirth) {
        throw new Error("Nombre y fecha de nacimiento son obligatorios");
      }

      // Validar al menos un padre con nombre y email
      const validParents = parents.filter(
        (p) => p.name.trim() && p.email.trim() && validateEmail(p.email)
      );

      if (validParents.length === 0) {
        throw new Error(
          "Debe registrar al menos un padre con nombre y email válido"
        );
      }

      // Enviar datos al backend
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...student,
          dateOfBirth: new Date(student.dateOfBirth)
            .toISOString()
            .split("T")[0],
          parents: validParents,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en el registro");
      }

      // Éxito: resetear formulario y mostrar mensaje
      setMessage({
        text: "¡Estudiante registrado exitosamente!",
        type: "success",
      });
      setStudent({ name: "", dateOfBirth: "", gender: "", allergies: "" });
      setParents([
        { name: "", phone: "", email: "" },
        { name: "", phone: "", email: "" },
      ]);

      // Redirigir después de 2 segundos
      setTimeout(() => navigate("/students"), 2000);
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "teacher"]}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Registro de Nuevo Estudiante
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* Sección de Padres */}
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Datos de los Padres/Tutores
            </Typography>

            {parents.map((parent, index) => (
              <Box
                key={index}
                sx={{ mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Padre/Madre/Tutor {index + 1}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nombre completo"
                      name="name"
                      value={parent.name}
                      onChange={(e) => handleParentChange(index, e)}
                      required={index === 0} // Solo requerir el primer padre
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      name="phone"
                      value={parent.phone}
                      onChange={(e) => handleParentChange(index, e)}
                      inputProps={{ pattern: "[0-9]{10}" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      value={parent.email}
                      onChange={(e) => handleParentChange(index, e)}
                      required={index === 0} // Solo requerir el primer padre
                      error={parent.email && !validateEmail(parent.email)}
                      helperText={
                        parent.email && !validateEmail(parent.email)
                          ? "Email inválido"
                          : ""
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            {/* Sección del Estudiante */}
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Datos del Estudiante
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={student.name}
                  onChange={handleStudentChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de nacimiento"
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleStudentChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Género"
                  name="gender"
                  value={student.gender}
                  onChange={handleStudentChange}
                  SelectProps={{ native: true }}
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
                  onChange={handleStudentChange}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 4, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Registrar Estudiante"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ProtectedRoute>
  );
}

export default RegistrationForm;
