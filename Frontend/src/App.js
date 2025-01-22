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
import EvaluateStudent from "./pages/Department/EvaluateStudent";
import CertificateOfRegistration from "./pages/Registrar/CertificateOfRegistration";

import AdvisingStudent from "./pages/Department/AdvisingStudent";
import DepartmentLoginCard from "./pages/Department/DepartmentLoginCard";
import DepartmentDashboard from "./pages/Department/DepartmentDashboard";
import DepartmentInstructorList from "./pages/Department/DepartmentInstructorList";
import DepartmentStudentList from "./pages/Department/DepartmentStudentList";
import DepartmentAccount from "./pages/Department/DepartmentAccount";
import DepartmentMasterList from "./pages/Department/DepartmentMasterlist"; // Import the new component

import AdminUserList from "./StaticFunctions/AdminUserList";

import { validateCredentials } from "./StaticFunctions/staticFunctions";

import PageNotFound from "./pages/404page/PageNotFound"; // Import the custom 404 component
import axios from "axios";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";
import { useAlert } from "./components/Alert";

function App() {
  const [user, setUser] = useState(null); // Holds user information
  const [role, setRole] = useState(null); // Tracks user role
  const {triggerAlert} = useAlert();

  const handleLogin = async (username, password, group) => {
    if (!username || !password) {
      return { error: "Username and password must be filled." };
    }

    try {
      const res = await axios.post(`https://enrollmentsystem-b0is.onrender.com/api/login/${group}/`, {
        username,
        password,
      });
      if(res?.data?.success) triggerAlert("success", "Success", "Login Successfully");
      return res.data; // Return the successful response data
    } catch (err) {
      return err.response.data;
    }
  };

  // For logging out all users
  const handleLogout = async () => {
    try {
      const logoutUrl = `https://enrollmentsystem-b0is.onrender.com/api/logout/`;

      const res = await axios.post(logoutUrl);

      // Redirect after successful logout
      if (res?.data?.success) {
        // // console.log(); // For debugging
        // // window.location.reload();
        // <Navigate to={`/${res?.data?.group}/`} />; // Navigate to the group's page
        triggerAlert("success", "Success", "Logout Successfully");
      }
    } catch (error) {
      // Handle any errors that occur during the axios request
      console.log(
        "Logout Failed:",
        error.response?.data?.detail || error.message
      );
      triggerAlert("error", "Logout Failed", error.response?.data?.detail || error?.message || "An error occured");
    }
  };

  // Redirect Component
  const RedirectToAdmin = () => {
    window.location.href = "https://enrollmentsystem-b0is.onrender.com/admin/login/";
    return null; // Return null since we don't render anything
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to appropriate login */}
        <Route path="/" element={<Navigate to="/student" />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={<StudentLoginCard onLogin={handleLogin} />}
        />
        <Route
          path="/reset-password/:userId/:token/"
          element={<ResetPassword />}
        />
        <Route
          path="/forget-password"
          element={<ForgetPassword />}
        />
        <Route
          path="/student/dashboard"
          element={<Dashboard onLogout={handleLogout} />}
        />
        <Route
          path="/student/cor"
          element={<COR onLogout={handleLogout} />}
        />
        <Route
          path="/student/checklist"
          element={<Checklist onLogout={handleLogout} />}
        />
        <Route
          path="/student/profile"
          element={<StudentProfile onLogout={handleLogout} />}
        />
        <Route path="/student/register" element={<RegisterForm />} />

        {/* Registrar Routes */}
        <Route
          path="/registrar"
          element={<RegistrarLoginCard onLogin={handleLogin} />}
        />
        <Route
          path="/registrar/dashboard"
          element={<RegistrarDashboard onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/enrollmentList"
          element={<EnrollmentList onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/studentList"
          element={<ListOfStudents onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/account"
          element={<RegistrarAccounts onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/enroll-student/:studentId?"
          element={<EnrollStudent onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/billing/:studentId?"
          element={<Billing onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/evaluate-payment"
          element={<EvaluatePayment onLogout={handleLogout} />}
        />
        <Route
          path="/registrar/certificate-of-registration/:studentId?"
          element={<CertificateOfRegistration onLogout={handleLogout} />}
        />

        {/* Department Routes */}
        <Route
          path="/department"
          element={<DepartmentLoginCard onLogin={handleLogin} />}
        />
        <Route
          path="/department/dashboard"
          element={<DepartmentDashboard onLogout={handleLogout} />}
        />
        <Route
          path="/department/departmentInstructorList"
          element={<DepartmentInstructorList onLogout={handleLogout} />}
        />
        <Route
          path="/department/departmentStudentList"
          element={<DepartmentStudentList onLogout={handleLogout} />}
        />
        <Route
          path="/department/evaluate-student/:studentId?"
          element={<EvaluateStudent onLogout={handleLogout} />}
        />
        <Route
          path="/department/departmentMasterList"
          element={<DepartmentMasterList onLogout={handleLogout} />}
        />
        <Route
          path="/department/departmentAccount"
          element={<DepartmentAccount onLogout={handleLogout} />}
        />
        <Route
          path="/department/advisingStudent/:studentId?"
          element={<AdvisingStudent onLogout={handleLogout} />}
        />

        {/* Admin User List */}
        <Route path="/admin" element={<RedirectToAdmin />} />

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
