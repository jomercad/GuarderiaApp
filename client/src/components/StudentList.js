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
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function StudentList() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Realiza la petición a la API para obtener los estudiantes
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) navigate("/login");
          throw new Error("Error al cargar estudiantes");
        }

        const data = await response.json();

        // // Filtrar estudiantes para padres
        // if (user?.role === "parent") {
        //   const parentStudents = data.filter((student) =>
        //     student.parents.some((parent) => parent.id === user.parentId)
        //   );
        //   setStudents(parentStudents);
        // } else {
        //   setStudents(data);
        // }
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token, user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este estudiante?")) return;

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar");

      setStudents((prev) => prev.filter((student) => student.id !== id));
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
        <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Lista de Estudiantes
            </Typography>
            {(user?.role === "admin" || user?.role === "teacher") && (
              <Button variant="contained" component={Link} to="/registration">
                Nuevo Estudiante
              </Button>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {students.length === 0 ? (
            <Typography variant="body1" align="center">
              No se encontraron estudiantes
            </Typography>
          ) : (
            <List>
              {students.map((student) => (
                <ListItem
                  key={student.id}
                  divider
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/student/${student.id}`}
                        size="small"
                      >
                        Detalle
                      </Button>
                      {(user?.role === "admin" || user?.role === "teacher") && (
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/student/edit/${student.id}`}
                          size="small"
                        >
                          Editar
                        </Button>
                      )}
                      {user?.role === "admin" && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(student.id)}
                          size="small"
                        >
                          Eliminar
                        </Button>
                      )}
                    </Box>
                  }
                >
                  <ListItemText
                    primary={student.name}
                    secondary={
                      <>
                        <div>Nacimiento: {student.dateOfBirth}</div>
                        <div>
                          Padres:{" "}
                          {student.parents?.map((p) => p.name).join(", ")}
                        </div>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </ProtectedRoute>
  );
}

export default StudentList;
