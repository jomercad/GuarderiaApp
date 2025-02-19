// frontend/src/components/StudentDetail.js
import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Grid, Chip } from "@mui/material";
import { useParams } from "react-router-dom";

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [age, setAge] = useState(null);

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        if (data.dateOfBirth) {
          const birthDate = new Date(data.dateOfBirth);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            calculatedAge--;
          }
          setAge(calculatedAge);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!student) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Cargando...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {student.name}
        </Typography>

        {/* Sección de Información Básica */}
        <Box
          sx={{
            mt: 3,
            mb: 4,
            p: 2,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "text.secondary",
              borderBottom: "2px solid",
              borderColor: "primary.main",
            }}
          >
            Información Básica
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <DetailItem
                label="Fecha de Nacimiento"
                value={student.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem label="Edad" value={`${age} años`} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem label="Género" value={student.gender} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                label="Alergias"
                value={student.allergies || "Ninguna registrada"}
                highlight={!!student.allergies}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Sección de Padres */}
        {student.parents && student.parents.length > 0 && (
          <Box
            sx={{
              mt: 3,
              mb: 4,
              p: 2,
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "text.secondary",
                borderBottom: "2px solid",
                borderColor: "primary.main",
              }}
            >
              Padres ({student.parents.length})
            </Typography>
            <Grid container spacing={3}>
              {student.parents.map((parent, index) => (
                <Grid item xs={12} md={6} key={parent.id}>
                  <Paper sx={{ p: 2, borderRadius: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 1, color: "primary.main" }}
                    >
                      Padre/Madre {index + 1}
                      <Chip
                        label="Contacto Principal"
                        size="small"
                        sx={{
                          ml: 1,
                          display: index === 0 ? "inline-flex" : "none",
                        }}
                      />
                    </Typography>
                    <DetailItem label="Nombre" value={parent.name} />
                    <DetailItem
                      label="Teléfono"
                      value={parent.phone || "No registrado"}
                    />
                    <DetailItem label="Correo" value={parent.email} isEmail />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Sección de Grupos */}
        {student.groups && student.groups.length > 0 && (
          <Box
            sx={{
              mt: 3,
              mb: 4,
              p: 2,
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "text.secondary",
                borderBottom: "2px solid",
                borderColor: "primary.main",
              }}
            >
              Grupos ({student.groups.length})
            </Typography>
            <Grid container spacing={2}>
              {student.groups.map((group) => (
                <Grid item key={group.id}>
                  <Chip
                    label={group.name}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Sección de Asistencias */}
        {student.attendances && student.attendances.length > 0 && (
          <Box
            sx={{ mt: 3, p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "text.secondary",
                borderBottom: "2px solid",
                borderColor: "primary.main",
              }}
            >
              Historial de Asistencia ({student.attendances.length} registros)
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {student.attendances.map((att) => (
                <Grid item xs={12} sm={6} key={att.id}>
                  <Paper
                    sx={{
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">
                        {new Date(att.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={att.present ? "Presente" : "Ausente"}
                      color={att.present ? "success" : "error"}
                      size="small"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

// Componente auxiliar para mostrar items detalle
const DetailItem = ({ label, value, isEmail = false, highlight = false }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ color: "text.secondary", minWidth: 120 }}
    >
      {label}:
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontWeight: highlight ? "bold" : "normal",
        color: highlight ? "error.main" : "inherit",
      }}
    >
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {value}
        </a>
      ) : (
        value
      )}
    </Typography>
  </Box>
);

export default StudentDetail;
