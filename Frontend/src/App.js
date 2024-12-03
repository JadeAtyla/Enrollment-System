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
import EnrollStudent from "./pages/Registrar/EnrollStudent";
import Billing from "./pages/Registrar/Billing";
import EvaluatePayment from "./pages/Registrar/EvaluatePayment";
import CertificateOfRegistration from "./pages/Registrar/CertificateOfRegistration";

import DepartmentLoginCard from "./pages/Department/DepartmentLoginCard";
import DepartmentDashboard from "./pages/Department/DepartmentDashboard";
import DepartmentInstructorList from "./pages/Department/DepartmentInstructorList";
import DepartmentScheduleList from "./pages/Department/DepartmentScheduleList";
import DepartmentStudentList from "./pages/Department/DepartmentStudentList";
import DepartmentAccount from "./pages/Department/DepartmentAccount";

import AdminUserList from "./StaticFunctions/AdminUserList";

import { validateCredentials } from "./StaticFunctions/staticFunctions";

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
        {/* Redirect root to appropriate login */}
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
          path="/student/register"
          element={<RegisterForm />}
        />

        <Route
          path="/student/cor"
          element={
            user && role === "student" ? <COR onLogout={handleLogout} /> : <Navigate to="/student" />
          }
        />
        <Route
          path="/student/checklist"
          element={
            user && role === "student" ? <Checklist onLogout={handleLogout} /> : <Navigate to="/student" />
          }
        />
        <Route
          path="/student/profile"
          element={
            user && role === "student" ? <StudentProfile onLogout={handleLogout} /> : <Navigate to="/student" />
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
          path="/registrar/enroll-student"
          element={<EnrollStudent onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/billing"
          element={<Billing onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/evaluate-payment"
          element={<EvaluatePayment onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/certificate-of-registration"
          element={<CertificateOfRegistration onLogout={handleLogout} />}
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
          path="/department/departmentDashboard"
          element={
            user && role === "department" ? (
              <DepartmentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />

        <Route
          path="/department/departmentInstructorList"
          element={
            user && role === "department" ? (
              <DepartmentInstructorList onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/departmentScheduleList"
          element={
            user && role === "department" ? (
              <DepartmentScheduleList onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/departmentStudentList"
          element={
            user && role === "department" ? (
              <DepartmentStudentList onLogout={handleLogout} />
            ) : (
              <Navigate to="/department" />
            )
          }
        />
        <Route
          path="/department/departmentAccount"
          element={
            user && role === "department" ? (
              <DepartmentAccount onLogout={handleLogout} />
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
