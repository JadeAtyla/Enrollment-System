import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const StudentProfile = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState("account");
  const navigate = useNavigate();

  const handleSavePassword = () => {
    alert("Password updated successfully!");
    setCurrentView("account");
  };

  const handleNavigate = (section) => {
    switch (section) {
      case "dashboard":
        navigate("/student/dashboard");
        break;
      case "profile":
        navigate("/student/profile");
        break;
      case "cor":
        navigate("/student/cor");
        break;
      case "checklist":
        navigate("/student/checklist");
        break;
      default:
        break;
    }
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex">
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} />

      <div className="flex-1">
        {/* Header */}
        <Header onLogout={onLogout} />

        {/* Main Container */}
        <div className="flex items-center justify-center h-auto">
          <div className="relative bg-white rounded-[24px] shadow-md p-10 mt-20 w-[950px] min-h-[500px]">
            {/* Tabs */}
            <div className="relative flex justify-between items-center text-xl font-bold mb-6">
              <button
                onClick={() => setCurrentView("account")}
                className="w-1/2 text-center pb-2 relative transition"
              >
                <span
                  className={`transition-all ${
                    currentView === "account" ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  Account
                </span>
                {currentView === "account" && (
                  <div className="absolute bottom-0 left-0 h-[4px] w-full bg-blue-500 transition-all duration-300"></div>
                )}
              </button>
              <button
                onClick={() => setCurrentView("personalData")}
                className="w-1/2 text-center pb-2 relative transition"
              >
                <span
                  className={`transition-all ${
                    currentView === "personalData"
                      ? "text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  Personal Data
                </span>
                {currentView === "personalData" && (
                  <div className="absolute bottom-0 left-0 h-[4px] w-full bg-blue-500 transition-all duration-300"></div>
                )}
              </button>
            </div>

            {/* Account View */}
            {currentView === "account" && (
              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-[18rem] text-md">
                  <div>
                    <p className="text-gray-800 font-semibold">
                      Student Number:
                    </p>
                    <p className="text-gray-600">[Student Number]</p>
                    <p className="text-gray-800 font-semibold mt-6">Email:</p>
                    <p className="text-gray-600">[Email]</p>
                    <p className="text-gray-800 font-semibold mt-6">Status:</p>
                    <p className="text-gray-600">[Status]</p>
                    <p className="text-gray-800 font-semibold mt-6">
                      Contact Number:
                    </p>
                    <p className="text-gray-600">[Contact Number]</p>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Course:</p>
                    <p className="text-gray-600">[Course]</p>
                    <p className="text-gray-800 font-semibold mt-6">
                      Year Level:
                    </p>
                    <p className="text-gray-600">[Year Level]</p>
                    <p className="text-gray-800 font-semibold mt-6">Section:</p>
                    <p className="text-gray-600">[Section]</p>
                    <p className="text-gray-800 font-semibold mt-6">
                      Password:
                    </p>
                    <p className="text-gray-600">**********</p>
                  </div>
                </div>
                <div className="flex justify-center mt-12 gap-4">
                  <button
                    onClick={() => setCurrentView("changePassword")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* Change Password View */}
            {currentView === "changePassword" && (
              <div className="flex flex-col items-center justify-center">
                <div className="space-y-6 text-md w-2/4">
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      Old Password:
                    </label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      New Password:
                    </label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-12 gap-4">
                  <button
                    onClick={() => setCurrentView("account")}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSavePassword}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Personal Data View */}
            {currentView === "personalData" && (
              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-[18rem] text-md">
                  <div>
                    <p className="text-gray-800 font-semibold">Last Name:</p>
                    <p className="text-gray-600">[Last Name]</p>
                    <p className="text-gray-800 font-semibold mt-6">
                      Middle Name:
                    </p>
                    <p className="text-gray-600">[Middle Name]</p>
                    <p className="text-gray-800 font-semibold mt-6">Address:</p>
                    <p className="text-gray-600">[Address]</p>
                    <p className="text-gray-800 font-semibold mt-6">Gender:</p>
                    <p className="text-gray-600">[Gender]</p>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">First Name:</p>
                    <p className="text-gray-600">[First Name]</p>
                    <p className="text-gray-800 font-semibold mt-6">Suffix:</p>
                    <p className="text-gray-600">[Suffix]</p>
                    <p className="text-gray-800 font-semibold mt-6">
                      Birthday:
                    </p>
                    <p className="text-gray-600">[mm-dd-yyyy]</p>
                  </div>
                </div>
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setCurrentView("account")}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
