import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentLoginCard from "./components/Student/StudentLoginCard";
import Dashboard from "./components/Student/Dashboard";
import RegisterForm from "./components/Student/RegisterForm";
import COR from "./components/Student/COR";
import Checklist from "./components/Student/Checklist";
import StudentProfile from "./components/Student/StudentProfile";
import RegistrarLoginCard from "./components/Registrar/RegistrarLoginCard";
import RegistrarDashboard from "./components/Registrar/RegistrarDashboard";
import EnrollmentList from "./components/Registrar/EnrollmentList";
import ListOfStudents from "./components/Registrar/ListOfStudents";
import RegistrarAccounts from "./components/Registrar/RegistrarAccounts";
import RegistrarRegisterForm from "./components/Registrar/RegistrarRegisterForm";
import EvaluateStudent from "./components/Registrar/EvaluateStudent";
import EnrollStudent from "./components/Registrar/EnrollStudent";
import Billing from "./components/Registrar/Billing";
import EvaluatePayment from "./components/Registrar/EvaluatePayment";
import CertificateOfRegistration from "./components/Registrar/CertificateOfRegistration"; // Import Certificate of COR component

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (identifier, password) => {
    if (!identifier || !password) {
      alert("Please enter both ID and password");
      return;
    }

    const sampleUsers = [
      { identifier: "123", password: "password123", role: "student" },
      { identifier: "456", password: "password456", role: "registrar" },
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

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("authToken"); // Clear token or session storage (optional)
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to Student Login */}
        <Route path="/" element={<Navigate to="/student" />} />

        {/* Student Routes */}
        <Route path="/register" element={<RegisterForm />} />
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
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/profile"
          element={
            user && role === "student" ? (
              <StudentProfile onLogout={handleLogout} />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/cor"
          element={
            user && role === "student" ? (
              <COR onLogout={handleLogout} />
            ) : (
              <Navigate to="/student" />
            )
          }
        />
        <Route
          path="/student/checklist"
          element={
            user && role === "student" ? (
              <Checklist onLogout={handleLogout} />
            ) : (
              <Navigate to="/student" />
            )
          }
        />

        {/* Registrar Routes */}
        <Route
          path="/registrar"
          element={
            user && role === "registrar" ? (
              <Navigate to="/registrar/dashboard" />
            ) : (
              <RegistrarLoginCard onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/registrar/dashboard"
          element={
            user && role === "registrar" ? (
              <RegistrarDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/enrollmentList"
          element={
            user && role === "registrar" ? (
              <EnrollmentList onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/evaluate-student"
          element={
            user && role === "registrar" ? (
              <EvaluateStudent onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/enroll-student"
          element={
            user && role === "registrar" ? (
              <EnrollStudent onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/studentList"
          element={
            user && role === "registrar" ? (
              <ListOfStudents onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/account"
          element={
            user && role === "registrar" ? (
              <RegistrarAccounts onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/register"
          element={
            user && role === "registrar" ? (
              <RegistrarRegisterForm />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/billing"
          element={
            user && role === "registrar" ? (
              <Billing />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/evaluate-payment"
          element={
            user && role === "registrar" ? (
              <EvaluatePayment />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/certificate-of-registration"
          element={
            user && role === "registrar" ? (
              <CertificateOfRegistration />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
