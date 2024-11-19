import React, { useState } from "react";
import LoginCard from "./components/LoginCard";
import StudentTypeSelection from "./components/StudentTypeSelection";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentStep, setCurrentStep] = useState("login");
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null); // State to manage logged-in user
  const [loading, setLoading] = useState(false); // State to manage loading
  const [userType, setUserType] = useState("Student"); // State to manage user type

  const handleRegisterClick = () => {
    setCurrentStep("studentType");
  };

  const handleLogin = (studentNumber, password) => {
    if (!studentNumber || !password) {
      alert("Please enter both student number and password");
      return;
    }

    setLoading(true); // Show loading state

    // Simulate user authentication (e.g., check against a predefined list of users)
    const sampleUsers = [
      { studentNumber: "12345", password: "password123" },
      { studentNumber: "67890", password: "password456" },
    ];

    setTimeout(() => {
      // Credentials only apply to student login
      if (userType === "Student") {
        const matchedUser = sampleUsers.find(
          (user) =>
            user.studentNumber === studentNumber && user.password === password
        );

        if (matchedUser) {
          setUser(matchedUser); // Set the user in state
          setCurrentStep("dashboard"); // Navigate to dashboard
        } else {
          alert("Invalid student number or password");
        }
      } else {
        alert("Non-student users cannot log in with student credentials.");
      }

      setLoading(false); // Hide loading state after authentication
    }, 1000); // Simulate a delay for the authentication process
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === "login" && (
        <LoginCard
          onLogin={handleLogin}
          onRegisterClick={handleRegisterClick}
          setUserType={setUserType}
          userType={userType} // Pass userType to LoginCard
        />
      )}
      {currentStep === "studentType" && (
        <StudentTypeSelection
          setFormData={setFormData}
          onNext={() => setCurrentStep("registerForm")}
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
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 z-10">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default App;
