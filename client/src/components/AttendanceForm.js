// frontend/src/components/AttendanceForm.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

function AttendanceForm() {
  const [date, setDate] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener grupos del backend
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (groupId) {
      const selectedGroup = groups.find((g) => g.id === parseInt(groupId));
      if (selectedGroup) {
        setStudents(selectedGroup.students || []);
        const initAttendance = {};
        selectedGroup.students.forEach((student) => {
          initAttendance[student.id] = true;
        });
        setAttendance(initAttendance);
      }
    } else {
      setStudents([]);
    }
  }, [groupId, groups]);

  const handleAttendanceChange = (studentId, value) => {
    setAttendance({ ...attendance, [studentId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !groupId) {
      setMessage("Por favor, seleccione fecha y grupo.");
      return;
    }
    const attendanceArray = Object.keys(attendance).map((studentId) => ({
      studentId: parseInt(studentId),
      present: attendance[studentId],
    }));
    try {
      const response = await fetch("/api/attendances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          groupId: parseInt(groupId),
          attendances: attendanceArray,
        }),
      });
      if (response.ok) {
        setMessage("Asistencia registrada correctamente");
      } else {
        setMessage("Error al registrar asistencia");
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
          Toma de Asistencia
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="group-label">Grupo</InputLabel>
                <Select
                  labelId="group-label"
                  value={groupId}
                  label="Grupo"
                  onChange={(e) => setGroupId(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccione un grupo</em>
                  </MenuItem>
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {students.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Estudiantes del Grupo</Typography>
              {students.map((student) => (
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  key={student.id}
                  sx={{ mt: 1 }}
                >
                  <Grid item xs={6}>
                    <Typography>{student.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id={`attendance-${student.id}`}>
                        Estado
                      </InputLabel>
                      <Select
                        labelId={`attendance-${student.id}`}
                        value={attendance[student.id] ? "present" : "absent"}
                        label="Estado"
                        onChange={(e) =>
                          handleAttendanceChange(
                            student.id,
                            e.target.value === "present"
                          )
                        }
                      >
                        <MenuItem value="present">Presente</MenuItem>
                        <MenuItem value="absent">Ausente</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Registrar Asistencia
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

export default AttendanceForm;
