// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomeScreen from "./components/HomeScreen";
import RegistrationForm from "./components/RegistrationForm";
import StudentList from "./components/StudentList";
import StudentDetail from "./components/StudentDetail";
import EditStudent from "./components/EditStudent";
import GroupManagement from "./components/GroupManagement";
import AttendanceForm from "./components/AttendanceForm";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/student/edit/:id" element={<EditStudent />} />
        <Route path="/groups" element={<GroupManagement />} />
        <Route path="/attendance" element={<AttendanceForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
