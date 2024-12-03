import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import universityLogo from "../../images/universityLogo.svg"; // Corrected path
import loginIcon from "../../images/Department/LoginIcons/OfficerIcon.svg"; // Corrected path
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { validateCredentials } from "../staticFunctions";

const DepartmentLoginCard = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLoginClick = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role: department");
  
    const result = validateCredentials(username, password, "department");
  
    if (typeof result === "string") {
      setErrorMessage(result); // Display error message
    } else {
      console.log("Validation Success:", result);
      setErrorMessage(""); // Clear error on success
      onLogin(result.identifier, result.password, result.role); // Pass user info to parent component
      navigate("/department/dashboard"); // Navigate to department dashboard
    }
  };
  
  

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-yellow-400 to-blue-900">
      {/* Main Container */}
      <div className="relative flex rounded-[32px] shadow-lg overflow-hidden w-[1027px] h-[641px]">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center absolute left-0 z-10 w-[459px] h-[641px] bg-white rounded-[32px]">
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

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-[600px] h-[641px] bg-white bg-opacity-25 p-6 ml-[436px]">
          <div className="bg-blue-900 p-4 rounded-full shadow-lg mb-6">
            <img
              src={loginIcon}
              alt="Login Icon"
              className="h-[120px] w-[120px]"
            />
          </div>

          <h2 className="text-[30px] font-extrabold text-black mb-6">
            DEPARTMENT LOGIN
          </h2>

          <div className="w-[400px]">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(""); // Clear error on input
              }}
              placeholder="USERNAME"
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md"
            />
            <div className="relative mb-4">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(""); // Clear error on input
                }}
                placeholder="PASSWORD"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {passwordVisible ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <button
            onClick={handleLoginClick}
            className="w-[180px] py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentLoginCard;
