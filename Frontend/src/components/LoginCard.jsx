import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import universityLogo from "../images/universityLogo.svg";

const LoginCard = ({ onLogin, onRegisterClick, setUserType, userType }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [studentNumber, setStudentNumber] = useState(""); // Student number state
  const [password, setPassword] = useState(""); // Password state

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleLoginClick = () => {
    // Call the onLogin function passed from App.js with the entered credentials
    onLogin(studentNumber, password);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[350px] sm:w-[400px] md:w-[450px] p-8 flex flex-col items-center">
      {/* University Logo */}
      <img src={universityLogo} alt="University Logo" className="h-24 mb-6" />
      <h1 className="text-center text-lg font-bold">CAVITE STATE UNIVERSITY</h1>
      <h2 className="text-center text-sm text-gray-600 mb-6">BACOOR CAMPUS</h2>

      {/* Dropdown */}
      <select
        id="user-type"
        className="block w-full text-center bg-transparent border-none text-gray-800 font-semibold text-lg mb-6 cursor-pointer"
        value={userType}
        onChange={handleUserTypeChange}
      >
        <option value="Student">STUDENT LOGIN</option>
        <option value="Officer">OFFICER LOGIN</option>
      </select>

      {/* Student Number or Username */}
      <input
        type="text"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        placeholder={userType == "Student" ? "STUDENT NUMBER" : "USERNAME"}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Password */}
      <div className="relative w-full mb-4">
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PASSWORD"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Links */}
      <div className="flex justify-between w-full text-sm mb-6">
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
        {userType === "Student" && (
          <span>
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-blue-600 hover:underline"
              onClick={onRegisterClick}
            >
              Register
            </a>
          </span>
        )}
      </div>

      {/* Login Button */}
      <button
        onClick={handleLoginClick}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </div>
  );
};

export default LoginCard;
