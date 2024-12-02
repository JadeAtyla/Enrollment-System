import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import universityLogo from "../../images/universityLogo.svg"; 
import loginIcon from "../../images/Registrar/LogInIcons/OfficerIcon.svg"; // Corrected path
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const RegistrarLoginCard = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLoginClick = () => {
    // Call onLogin function passed as a prop
    onLogin(username, password);
    // Redirect to registrar dashboard after successful login
    navigate("/registrar/dashboard");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-yellow-400 to-blue-900">
      {/* Main Container */}
      <div className="relative flex rounded-[32px] shadow-lg overflow-hidden w-[1027px] h-[641px]">
        {/* Left Section (White) */}
        <div className="flex flex-col justify-center items-center absolute left-0 z-10 w-[459px] h-[641px] bg-white rounded-[32px]">
          <img
            src={universityLogo}
            alt="University Logo"
            className="h-[220px] mb-6"
          />
          <h1 className="text-center text-[25px] font-extrabold text-gray-800 font-inter">
            CAVITE STATE UNIVERSITY
          </h1>
          <h2 className="text-center text-[16px] font-medium text-gray-600 mt-2 font-inter">
            BACOOR CAMPUS
          </h2>
        </div>

        {/* Right Section (Transparent) */}
        <div className="flex flex-col justify-center items-center w-[600px] h-[641px] bg-white bg-opacity-25 p-6 ml-[436px]">
          {/* Login Icon */}
          <div className="bg-blue-900 p-4 rounded-full shadow-lg mb-6">
            <img
              src={loginIcon}
              alt="Login Icon"
              className="h-[120px] w-[120px]"
            />
          </div>

          {/* Login Header */}
          <h2 className="text-[30px] font-extrabold text-black mb-6 font-inter">
            REGISTRAR LOGIN
          </h2>

          {/* Form Inputs */}
          <div className="w-[400px]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] placeholder-font-ponnala"
            />
            <div className="relative mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] placeholder-font-ponnala"
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
          </div>

          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="w-[180px] py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarLoginCard;
