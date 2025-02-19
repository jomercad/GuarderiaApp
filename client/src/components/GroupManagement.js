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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function GroupManagement() {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState({
    id: null,
    name: "",
    criteria: "",
    studentIds: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch(console.error);

    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.error);
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleStudentSelection = (e) => {
    setGroup({
      ...group,
      studentIds: e.target.value,
    });
  };

  // Enviar formulario (crear/editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = group.id ? "PUT" : "POST";
      const url = group.id ? `/api/groups/${group.id}` : "/api/groups";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(group),
      });

      if (response.ok) {
        const updatedGroup = await response.json();
        if (group.id) {
          setGroups(
            groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
          );
        } else {
          setGroups([...groups, updatedGroup]);
        }
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Editar grupo
  const handleEdit = (groupToEdit) => {
    setGroup({
      id: groupToEdit.id,
      name: groupToEdit.name,
      criteria: groupToEdit.criteria,
      studentIds: groupToEdit.students.map((s) => s.id),
    });
  };

  // Eliminar grupo
  const handleDelete = async () => {
    try {
      await fetch(`/api/groups/${deleteId}`, { method: "DELETE" });
      setGroups(groups.filter((g) => g.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setGroup({ id: null, name: "", criteria: "", studentIds: [] });
  };

  return (
    <Container maxWidth="md">
      {/* Formulario de creación/edición */}
      <Paper elevation={3} sx={{ p: 3, mt: 4, mb: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {group.id ? "Editar Grupo" : "Crear Nuevo Grupo"}
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
                label="Criterios"
                name="criteria"
                value={group.criteria}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estudiantes</InputLabel>
                <Select
                  multiple
                  value={group.studentIds}
                  onChange={handleStudentSelection}
                  renderValue={(selected) =>
                    students
                      .filter((s) => selected.includes(s.id))
                      .map((s) => s.name)
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {group.id ? "Actualizar Grupo" : "Crear Grupo"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Listado de grupos */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Grupos Existentes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Criterios</TableCell>
              <TableCell>Estudiantes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.criteria}</TableCell>
                <TableCell>
                  {group.students?.map((s) => s.name).join(", ")}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(group)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setDeleteId(group.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este grupo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GroupManagement;
