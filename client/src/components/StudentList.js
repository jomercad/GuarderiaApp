// frontend/src/components/StudentList.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Realiza la petición a la API para obtener los estudiantes
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Lista de Estudiantes
        </Typography>
        {students.length === 0 ? (
          <Typography variant="body1" align="center">
            No se encontraron estudiantes.
          </Typography>
        ) : (
          <List>
            {students.map((student) => (
              <ListItem key={student.id} divider>
                <ListItemText
                  primary={student.name}
                  secondary={
                    student.dateOfBirth && `Nacimiento: ${student.dateOfBirth}`
                  }
                />
                <Box>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/student/${student.id}`}
                    size="small" // Cambia el tamaño a pequeño
                    sx={{ mr: 1 }}
                  >
                    Ver Detalle
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/student/edit/${student.id}`}
                    size="small" // Cambia el tamaño a pequeño
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(student.id)}
                    size="small" // Cambia el tamaño a pequeño
                  >
                    Eliminar
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default StudentList;
