// frontend/src/context/AuthContext.js
import React, { createContext, useState } from "react";

// Se crea el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto que mantiene el estado del usuario autenticado
export const AuthProvider = ({ children }) => {
  // Se intenta recuperar la información almacenada en localStorage
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [user, setUser] = useState(storedUser);

  // Función para iniciar sesión y almacenar la información del usuario
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión y limpiar el almacenamiento
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
