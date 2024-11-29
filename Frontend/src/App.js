import React, { useState } from "react";
import LoginCard from "./components/Student/StudentLoginCard";
import Dashboard from "./components/Student/Dashboard";
import RegisterForm from "./components/Student/RegisterForm";

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

  return (
    <div>
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
          setCurrentStep={setCurrentStep} // Pass setCurrentStep to RegisterForm
        />
      )}
      {currentStep === "dashboard" && <Dashboard user={user} />}
    </div>
  );
}

export default App;
