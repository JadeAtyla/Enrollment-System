import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import universityLogo from "../../images/universityLogo.svg";
import registerIcon from "../../images/registerIcon.svg";

const RegisterForm = ({ onRegisterComplete }) => {
  const [formData, setFormData] = useState({
    studentNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Register Form Data:", formData);
    if (onRegisterComplete) onRegisterComplete();
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-yellow-400 to-blue-900"
    >
      {/* Main Container */}
      <div className="relative flex rounded-[32px] shadow-lg overflow-hidden w-[1027px] h-[641px]">
        {/* Left Section (Form Section) */}
        <div className="flex flex-col justify-center items-center w-[600px] h-[641px] bg-white bg-opacity-25 p-6">
          {/* Register Icon */}
          <div className="bg-blue-900 p-4 rounded-full shadow-lg mb-6">
            <img
              src={registerIcon}
              alt="Register Icon"
              className="h-[120px] w-[120px]"
            />
          </div>

          {/* Register Header */}
          <h2 className="text-[30px] font-extrabold text-black mb-6 font-inter">
            STUDENT REGISTER
          </h2>

          {/* Form Inputs */}
          <div className="w-[400px]">
            <input
              type="text"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleInputChange}
              placeholder="STUDENT NUMBER"
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
            />
            <div className="relative mb-4">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="PASSWORD"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {passwordVisible ? (
                  <FaEye className="w-5 h-5 text-gray-500" />
                ) : (
                  <FaEyeSlash className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="relative mb-6">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="RETYPE PASSWORD"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {confirmPasswordVisible ? (
                  <FaEye className="w-5 h-5 text-gray-500" />
                ) : (
                  <FaEyeSlash className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            className="w-[180px] py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Register
          </button>
        </div>

        {/* Right Section (Logo Section) */}
        <div className="flex flex-col justify-center items-center absolute right-0 z-10 w-[459px] h-[641px] bg-white rounded-[32px]">
          <img
            src={universityLogo}
            alt="University Logo"
            className="h-[220px] mb-6"
          />
          <h1 className="text-center text-[25px] font-extrabold text-gray-800">
            CAVITE STATE UNIVERSITY
          </h1>
          <h2 className="text-center text-[16px] font-medium text-gray-600 mt-2">
            BACOOR CAMPUS
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
