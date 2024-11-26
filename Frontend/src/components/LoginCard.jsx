import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import universityLogo from "../images/universityLogo.svg";
import loginIcon from "../images/loginIcon.svg"; // Login icon

const LoginCard = ({ onLogin, onRegisterClick, setUserType, userType }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLoginClick = () => {
    onLogin(studentNumber, password);
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-yellow-400 to-blue-900"
    >
      {/* Main Card */}
      <div className="flex w-[900px] h-[500px] rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center">
          <img
            src={universityLogo}
            alt="University Logo"
            className="h-60 mb-4" // Increased the size of the logo
          />
          <h1 className="text-center text-xl font-bold text-gray-700">
            CAVITE STATE UNIVERSITY
          </h1>
          <h2 className="text-center text-sm text-gray-500">BACOOR CAMPUS</h2>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white bg-opacity-60 flex justify-center items-center p-8">
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Login Icon */}
            <div className="bg-blue-900 p-4 rounded-full shadow-lg mb-6">
              <img
                src={loginIcon}
                alt="Login Icon"
                className="h-20 w-20"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              {userType === "Student" ? "STUDENT LOGIN" : "OFFICER LOGIN"}
            </h2>

            {/* Inputs */}
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder={userType === "Student" ? "STUDENT NUMBER" : "USERNAME"}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative w-full mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Eye Icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent"
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
              <button
                className="text-blue-600 hover:underline"
                onClick={() => console.log("Forgot Password clicked")}
              >
                Forgot Password?
              </button>
              {userType === "Student" && (
                <span>
                  Don't have an account?{" "}
                  <button
                    onClick={onRegisterClick}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register
                  </button>
                </span>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="w-36 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
