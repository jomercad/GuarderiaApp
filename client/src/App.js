import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeScreen from "./components/HomeScreen";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import StudentList from "./components/StudentList";
import StudentDetail from "./components/StudentDetail";
import EditStudent from "./components/EditStudent";
import GroupManagement from "./components/GroupManagement";
import AttendanceForm from "./components/AttendanceForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginForm />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "parent"]} />
          }
        >
          <Route path="/" element={<HomeScreen />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetail />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/groups" element={<GroupManagement />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/attendance" element={<AttendanceForm />} />
        </Route>

        {/* Redirecciones */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
