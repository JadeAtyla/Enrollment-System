import React, { useState } from 'react';
import LoginCard from './components/LoginCard';
import StudentTypeSelection from './components/StudentTypeSelection';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

function App() {
  const [currentStep, setCurrentStep] = useState('login');
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null); // State to manage logged-in user

  const handleRegisterClick = () => {
    setCurrentStep('studentType');
  };

  const handleLogin = (studentNumber, password) => {
    // Simulate user authentication (e.g., check against a predefined list of users)
    const sampleUsers = [
      { studentNumber: '12345', password: 'password123' },
      { studentNumber: '67890', password: 'password456' },
    ];

    const matchedUser = sampleUsers.find(
      (user) => user.studentNumber === studentNumber && user.password === password
    );

    if (matchedUser) {
      setUser(matchedUser); // Set the user in state
      setCurrentStep('dashboard'); // Navigate to dashboard
    } else {
      alert('Invalid student number or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === 'login' && <LoginCard onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}
      {currentStep === 'studentType' && <StudentTypeSelection setFormData={setFormData} onNext={() => setCurrentStep('registerForm')} />}
      {currentStep === 'registerForm' && (
        <RegisterForm formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 'dashboard' && <Dashboard user={user} />}
    </div>
  );
}

export default App;
