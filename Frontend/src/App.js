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
import Billing from "./pages/Registrar/Billing"; 
import EvaluatePayment from "./pages/Registrar/EvaluatePayment";
import CertificateOfRegistration from "./pages/Registrar/CertificateOfRegistration";

import DepartmentLoginCard from "./pages/Department/DepartmentLoginCard";
import DepartmentDashboard from "./pages/Department/DepartmentDashboard";

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
      { identifier: "789", password: "password789", role: "department" },
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
          path="/registrar/evaluate-student" // Added route for EnrollStudent
          element={
            user && role === "registrar" ? (
              <EvaluateStudent onLogout={handleLogout} />
            ) : (
              <Navigate to="/registrar" />
            )
          }
        />
        <Route
          path="/registrar/enroll-student" // Added route for EnrollStudent
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
        <Route
          path="/department/enrollmentList"
          element={
            user && role === "department" ? (
              <EnrollmentList onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/evaluate-student" // Added route for EnrollStudent
          element={
            user && role === "department" ? (
              <EvaluateStudent onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/enroll-student" // Added route for EnrollStudent
          element={
            user && role === "department" ? (
              <EnrollStudent onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/studentList"
          element={
            user && role === "department" ? (
              <ListOfStudents onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />

        <Route
          path="/department/account"
          element={
            user && role === "department" ? (
              <RegistrarAccounts onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/register"
          element={
            user && role === "department" ? (
              <RegistrarRegisterForm />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/billing"
          element={
            user && role === "department" ? (
              <Billing />
            ) : (
              <Navigate to="/department" />
            )
          }
        />

        <Route
          path="/department/evaluate-payment"
          element={
            user && role === "department" ? (
              <EvaluatePayment />
            ) : (
              <Navigate to="/department" />
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
