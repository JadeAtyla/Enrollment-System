import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentLoginCard from "./pages/Student/StudentLoginCard";
import Dashboard from "./pages/Student/Dashboard";
import RegisterForm from "./pages/Student/RegisterForm";
import COR from "./pages/Student/COR";
import Checklist from "./pages/Student/Checklist";
import StudentProfile from "./pages/Student/StudentProfile";

import RegistrarLoginCard from "./pages/Registrar/RegistrarLoginCard";
import RegistrarDashboard from "./pages/Registrar/RegistrarDashboard";
import EnrollmentList from "./pages/Registrar/EnrollmentList";
import ListOfStudents from "./pages/Registrar/ListOfStudents";
import RegistrarAccounts from "./pages/Registrar/RegistrarAccounts";
import RegistrarRegisterForm from "./pages/Registrar/RegistrarRegisterForm";
import EvaluateStudent from "./pages/Registrar/EvaluateStudent";
import EnrollStudent from "./pages/Registrar/EnrollStudent";
import Billing from "./pages/Registrar/Billing"; // Correct import path
import EvaluatePayment from "./pages/Registrar/EvaluatePayment";
import CertificateOfRegistration from "./pages/Registrar/CertificateOfRegistration";

import DepartmentLoginCard from "./pages/Department/DepartmentLoginCard";
import DepartmentDashboard from "./pages/Department/DepartmentDashboard";
import AdminUserList from "./pages/AdminUserList";

import { validateCredentials } from "./pages/staticFunctions";

function App() {
  const [user, setUser] = useState(null); // Holds user information
  const [role, setRole] = useState(null); // Tracks user role

  const handleLogin = (identifier, password, role) => {
    const result = validateCredentials(identifier, password, role);

    if (typeof result === "string") {
      alert(result); // Display error message
      return;
    }

    // Successful login
    setUser(result);
    setRole(result.role);

    // Debugging for confirmation
    console.log("Logged in User:", result);
    console.log("Role:", result.role);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to Student Login */}
        <Route path="/" element={<Navigate to="/student" />} />

        {/* Student Routes */}
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
          path="/register"
          element={<RegisterForm />}
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
          path="/registrar/certificate-of-registration"
          element={
            user && role === "registrar" ? (
              <CertificateOfRegistration />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />

        {/* Department Routes */}
        <Route
          path="/department"
          element={
            user && role === "department" ? (
              <Navigate to="/department/dashboard" />
            ) : (
              <DepartmentLoginCard onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/department/dashboard"
          element={
            user && role === "department" ? (
              <DepartmentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />

        {/* Admin User List */}
        <Route path="/users" element={<AdminUserList />} />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
