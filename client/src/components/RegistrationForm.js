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
} from "@mui/material";

function RegistrationForm() {
  // Estado para 2 padres
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

  const [message, setMessage] = useState("");

  // Manejar cambios en los padres
  const handleParentChange = (parentIndex, e) => {
    const newParents = [...parents];
    newParents[parentIndex][e.target.name] = e.target.value;
    setParents(newParents);
  };

  // Manejar cambios en el estudiante
  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar datos básicos del estudiante
      if (!student.name || !student.dateOfBirth) {
        setMessage("Nombre y fecha de nacimiento son obligatorios");
        return;
      }

      // Validar al menos un padre con nombre y email
      const validParents = parents.filter(
        (p) => p.name.trim() && p.email.trim()
      );

      if (validParents.length === 0) {
        setMessage("Debe registrar al menos un padre con nombre y correo");
        return;
      }

      // Formatear fecha a YYYY-MM-DD
      const formattedStudent = {
        ...student,
        dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0],
      };

      // Enviar datos al backend
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formattedStudent,
          parents: validParents,
        }),
      });

      if (!response.ok) throw new Error("Error en el registro");

      // Resetear formulario
      setMessage("¡Registro exitoso!");
      setStudent({ name: "", dateOfBirth: "", gender: "", allergies: "" });
      setParents([
        { name: "", phone: "", email: "" },
        { name: "", phone: "", email: "" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al registrar. Verifique los datos");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registro de Estudiante y Padres
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Sección de Padres */}
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            Datos de los Padres
          </Typography>

          {parents.map((parent, index) => (
            <Box
              key={index}
              sx={{ mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Padre/Madre {index + 1}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={parent.email}
                    onChange={(e) => handleParentChange(index, e)}
                    required={index === 0} // Solo requerir el primer padre
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre completo"
                name="name"
                value={student.name}
                onChange={handleStudentChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha de nacimiento"
                type="date"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handleStudentChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
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
          >
            Registrar
          </Button>

          {message && (
            <Typography
              variant="body1"
              align="center"
              sx={{
                mt: 2,
                color: message.startsWith("¡") ? "success.main" : "error.main",
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;
