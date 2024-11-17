import React, { useState } from 'react';
import LoginCard from './components/LoginCard';
import StudentTypeSelection from './components/StudentTypeSelection';
import RegisterForm from './components/RegisterForm';

function App() {
  const [currentStep, setCurrentStep] = useState('login'); // Tracks the current screen
  const [formData, setFormData] = useState({}); // Holds form data

  const handleRegisterClick = () => {
    setCurrentStep('studentType'); // Switch to StudentTypeSelection
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === 'login' && (
        <LoginCard onRegisterClick={handleRegisterClick} />
      )}
      {currentStep === 'studentType' && (
        <StudentTypeSelection
          setFormData={setFormData}
          onNext={() => setCurrentStep('registerForm')}
        />
      )}
      {currentStep === 'registerForm' && (
        <RegisterForm 
          formData={formData} 
          setFormData={setFormData} 
          setCurrentStep={setCurrentStep} 
        />
      )}
    </div>
  );
}

export default App;
