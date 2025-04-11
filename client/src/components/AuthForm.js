// frontend/src/components/AuthForm.js
import React, { useState, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AuthForm() {
  // "login" o "register"
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Define el endpoint según el modo de operación
    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";
    // Prepara el payload; en registro se asigna rol "padre"
    const payload = { email, password };
    if (mode === "register") {
      payload.role = "padre";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error en la autenticación");
      } else {
        if (mode === "login") {
          // Si el login es exitoso, se almacena la información en el contexto
          login(data);
          navigate("/");
        } else {
          // Registro exitoso: se notifica al usuario y se cambia al modo login
          setError("Registro exitoso. Por favor, inicie sesión.");
          setMode("login");
        }
      }
    } catch (err) {
      setError("Error en la comunicación con el servidor");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Tabs
          value={mode}
          onChange={(e, newValue) => {
            setMode(newValue);
            setError("");
          }}
          centered
        >
          <Tab label="Login" value="login" />
          <Tab label="Registro" value="register" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Button>
          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthForm;
