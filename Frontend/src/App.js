import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentLoginCard from "./components/Student/StudentLoginCard";
import Dashboard from "./components/Student/Dashboard";
import RegisterForm from "./components/Student/RegisterForm";
import RegistrarLoginCard from "./components/Registrar/RegistrarLoginCard";
import COR from "./components/Student/COR";
import Checklist from "./components/Student/Checklist";
import StudentProfile from "./components/Student/StudentProfile"; // Import StudentProfile

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (identifier, password) => {
    if (!identifier || !password) {
      alert("Please enter both ID and password");
      return;
    }

    const sampleUsers = [
      { identifier: "12345", password: "password123", role: "student" },
      { identifier: "67890", password: "password456", role: "registrar" },
    ];

    const matchedUser = sampleUsers.find(
      (user) => user.identifier === identifier && user.password === password
    );

    if (matchedUser) {
      setUser(matchedUser);
      setRole(matchedUser.role);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/student" />} />
        <Route
          path="/student"
          element={
            user && role === "student" ? (
              <Navigate to="/student/dashboard" />
            ) : (
              <StudentLoginCard onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/student/dashboard"
          element={
            user && role === "student" ? (
              <Dashboard />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/profile"
          element={
            user && role === "student" ? (
              <StudentProfile user={user} />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/cor"
          element={
            user && role === "student" ? (
              <COR />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/checklist"
          element={
            user && role === "student" ? (
              <Checklist />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/registrar" element={<RegistrarLoginCard />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
