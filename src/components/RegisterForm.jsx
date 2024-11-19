import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RegisterForm = ({ formData, setFormData, setCurrentStep }) => {
  const [step, setStep] = useState(1); // Tracks the current step

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthdate: date }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-[866px] h-[535px] p-8 relative">
        {step === 1 && <h1 className="text-center text-2xl font-bold mb-6 text-blue-500">ACCOUNT INFORMATION</h1>}
        {step === 2 && <h1 className="text-center text-2xl font-bold mb-6 text-blue-500">PERSONAL DATA</h1>}
        {step === 3 && <h1 className="text-center text-2xl font-bold mb-6 text-blue-500">REGISTRATION COMPLETE</h1>}

        {/* Step Indicators */}
        <div className="flex justify-between items-center mb-6">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full border-current font-bold">1</div>
            <span className="mt-2 text-sm">Account</span>
          </div>
          <div className={`w-1/3 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full border-current font-bold">2</div>
            <span className="mt-2 text-sm">Personal Data</span>
          </div>
          <div className={`w-1/3 h-1 ${step === 3 ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className={`flex flex-col items-center ${step === 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full border-current font-bold">3</div>
            <span className="mt-2 text-sm">Finish</span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="studentNumber"
                placeholder="Student Number"
                value={formData.studentNumber || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="yearLevel"
                placeholder="Year Level"
                value={formData.yearLevel || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="section"
                placeholder="Section"
                value={formData.section || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Retype Password"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="suffix"
                placeholder="Suffix"
                value={formData.suffix || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ''}
                onChange={handleChange}
                className="col-span-2 border border-gray-300 p-2 rounded-md w-full"
              />
              <DatePicker
                selected={formData.birthdate || null}
                onChange={handleDateChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholderText="Birthdate"
              />
              <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="absolute bottom-8 right-8 flex gap-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-blue-500">Congratulations!</h2>
            <p className="text-gray-600 mt-4">You have successfully registered.</p>
            <button
              className="absolute bottom-8 right-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setCurrentStep('login')}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
