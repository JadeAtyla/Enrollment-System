import React, { useState } from "react";
import LoginCard from "./components/Student/StudentLoginCard";
import Dashboard from "./components/Student/Dashboard";
import RegisterForm from "./components/Student/RegisterForm";
import Sidebar from "./components/Student/Sidebar";
import StudentProfile from "./components/Student/StudentProfile";
import Checklist from "./components/Student/Checklist";
import COR from "./components/Student/COR";

function App() {
  const [currentStep, setCurrentStep] = useState("login");
  const [user, setUser] = useState(null);

  // Initialize form data for the RegisterForm
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
    confirmPassword: "",
    course: "",
    yearLevel: "",
    email: "",
    section: "",
  });

  const handleLogin = (studentNumber, password) => {
    if (!studentNumber || !password) {
      alert("Please enter both student number and password");
      return;
    }

    // Simulate authentication
    const sampleUsers = [
      { studentNumber: "12345", password: "password123" },
      { studentNumber: "67890", password: "password456" },
    ];

    const matchedUser = sampleUsers.find(
      (user) => user.studentNumber === studentNumber && user.password === password
    );

    if (matchedUser) {
      setUser(matchedUser); // Save the user state
      setCurrentStep("dashboard"); // Navigate to dashboard
    } else {
      alert("Invalid student number or password");
    }
  };

  const handleNavigation = (step) => {
    setCurrentStep(step); // Navigate to the selected step
  };

  return (
    <div className="flex">
      {user && <Sidebar onNavigate={handleNavigation} />} {/* Ensure `onNavigate` is passed */}
      <div className="flex-grow">
        {currentStep === "login" && (
          <LoginCard
            onLogin={handleLogin}
            onRegisterClick={() => setCurrentStep("registerForm")}
          />
        )}
        {currentStep === "registerForm" && (
          <RegisterForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === "dashboard" && <Dashboard user={user} />}
        {currentStep === "profile" && <StudentProfile user={user} />}
        {currentStep === "checklist" && <Checklist />}
        {currentStep === "cor" && <COR />}
      </div>
    </div>
  );
}

export default App;
