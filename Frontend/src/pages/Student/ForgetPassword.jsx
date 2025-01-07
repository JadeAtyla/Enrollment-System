import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import universityLogo from "../../images/universityLogo.svg";
import loginIcon from "../../images/loginIcon.svg";
// import loginIcon from "../../images/loginIcon.svg";
import useData from "../../components/DataUtil";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { createData, data, error } = useData("/api/password_reset/"); // API endpoint to trigger password reset studentNumber

  useEffect(()=>{
    if(data) setSuccessMessage( data?.message || "If this Student Number is registered, a password reset link has been sent.");
    if(error) setErrorMessage(error?.data?.error || 'An error occured');
  }, [data, error]);

  const handleForgotPassword = async () => {
    if (!studentNumber) {
      setErrorMessage("Student Number is required.");
      return;
    }

    const resetData = { id: studentNumber };
    try {
      await createData(resetData); // Call the API to send the reset link
      setErrorMessage(""); // Clear error message if successful
      setStudentNumber(""); // Clear studentNumber input
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || "Error sending reset link.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/student");
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-yellow-400 to-blue-900 overflow-hidden">
      <div className="relative flex flex-col lg:flex-row items-center justify-center rounded-[32px] shadow-lg overflow-hidden w-full max-w-[1027px] h-auto lg:h-[641px] mx-4 lg:mx-0">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full lg:w-[459px] h-[500px] lg:h-[641px] bg-white p-6 rounded-[32px] lg:rounded-l-[32px] lg:absolute lg:top-0 lg:left-0 lg:z-10">
          <img src={universityLogo} alt="University Logo" className="h-[150px] lg:h-[220px] mb-6" />
          <h1 className="text-center text-[20px] lg:text-[25px] font-extrabold text-gray-800 font-inter">
            CAVITE STATE UNIVERSITY
          </h1>
          <h2 className="text-center text-[14px] lg:text-[16px] font-medium text-gray-600 mt-2 font-inter">
            BACOOR CAMPUS
          </h2>
          <h2 className="text-center text-[14px] lg:text-[16px] font-bold text-gray-600 mt-8 font-inter">
            Academic Records Viewer
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-full lg:w-[600px] h-[500px] lg:h-[641px] bg-white bg-opacity-25 p-6 lg:ml-[436px]">
           <button
                onClick={handleBackToLogin}
                className="absolute top-4 right-4 text-white text-2xl lg:text-3xl flex items-center hover:text-gray-300"
            >
                <FaArrowLeft className="mr-2" />
            </button>
          <div className="bg-blue-900 p-4 rounded-full shadow-lg mb-6">
            <img src={loginIcon} alt="Forgot Password Icon" className="h-[80px] lg:h-[120px] w-[80px] lg:w-[120px]" />
          </div>

          <h2 className="text-[24px] lg:text-[30px] font-extrabold text-black mb-6 font-inter">
            FORGOT PASSWORD
          </h2>

          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <div className="w-full max-w-[350px]">
            <div className="relative mb-6">
              <input
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="Enter your Student Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
              />
            </div>
          </div>

          <button
            onClick={handleForgotPassword}
            className="w-[180px] py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
