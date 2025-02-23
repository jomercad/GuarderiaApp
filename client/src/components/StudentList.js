// frontend/src/components/StudentList.js
import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

function StudentList() {
  const [students, setStudents] = useState([]);
  const { user } = useContext(AuthContext);
  const token = user?.token;

  useEffect(() => {
    // Se incluye el token en el header Authorization para acceder a rutas protegidas
    fetch("/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, [token]);

  // Si el usuario es "padre", filtrar para mostrar sólo a sus hijos
  let displayedStudents = students;
  if (user && user.role === "padre" && user.parentId) {
    displayedStudents = students.filter(
      (student) =>
        student.parents &&
        student.parents.some((parent) => parent.id === user.parentId)
    );
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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
        {displayedStudents.length === 0 ? (
          <Typography variant="body1" align="center">
            No se encontraron estudiantes.
          </Typography>
        ) : (
          <List>
            {displayedStudents.map((student) => (
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
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Ver Detalle
                  </Button>
                  {/* Los padres sólo pueden visualizar */}
                  {user && user.role !== "padre" && (
                    <>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/student/edit/${student.id}`}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(student.id)}
                        size="small"
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
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
