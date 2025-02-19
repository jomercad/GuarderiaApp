// frontend/src/components/GroupManagement.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function GroupManagement() {
  const [group, setGroup] = useState({
    name: "",
    criteria: "",
    studentIds: [],
  });
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener estudiantes para asignar al grupo
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleStudentSelection = (e) => {
    const {
      target: { value },
    } = e;
    setGroup({
      ...group,
      studentIds: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(group),
      });
      if (response.ok) {
        setMessage("Grupo creado exitosamente");
        setGroup({ name: "", criteria: "", studentIds: [] });
      } else {
        setMessage("Error al crear grupo");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error en la comunicación con el servidor");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión de Grupos
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Grupo"
                name="name"
                value={group.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Criterios (ej. edad, actividad)"
                name="criteria"
                value={group.criteria}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select-label">
                  Seleccionar Estudiantes
                </InputLabel>
                <Select
                  labelId="student-select-label"
                  multiple
                  value={group.studentIds}
                  onChange={handleStudentSelection}
                  label="Seleccionar Estudiantes"
                  renderValue={(selected) =>
                    students
                      .filter((student) => selected.includes(student.id))
                      .map((student) => student.name)
                      .join(", ")
                  }
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Crear Grupo
          </Button>
          {message && (
            <Typography
              variant="body1"
              align="center"
              color="primary"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default GroupManagement;
