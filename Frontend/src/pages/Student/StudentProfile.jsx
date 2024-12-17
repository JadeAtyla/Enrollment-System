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
    <div className="w-screen min-h-screen lg:h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onLogout={onLogout} />

        {/* Main Content */}
        <div className="flex justify-center items-center h-full px-4 sm:px-6 md:px-8 lg:px-0 lg:h-[calc(100%-4rem)] mt-7 mb-[7rem]">
          <div className="relative bg-white rounded-[1.5rem] shadow-lg p-6 md:p-10 w-full max-w-[30rem] lg:max-w-[60rem] min-h-[24rem] flex flex-col">
            {/* Tabs */}
            <div className="flex justify-between items-center text-lg font-bold mb-6 border-b-[0.125rem] border-gray-200">
              <button
                onClick={() => setCurrentView("account")}
                className={`w-1/2 text-center pb-2 transition ${
                  currentView === "account"
                    ? "text-blue-500 border-b-[0.125rem] border-blue-500"
                    : "text-gray-600"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setCurrentView("personalData")}
                className={`w-1/2 text-center pb-2 transition ${
                  currentView === "personalData"
                    ? "text-blue-500 border-b-[0.125rem] border-blue-500"
                    : "text-gray-600"
                }`}
              >
                Personal Data
              </button>
            </div>

            {/* Views */}
            <div className="flex-1 overflow-auto">
              {/* Account View */}
              {currentView === "account" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[0.9rem]">
                    <div>
                      <p className="text-gray-800 font-semibold">
                        Student Number:
                      </p>
                      <p className="text-gray-600">[Student Number]</p>
                      <p className="text-gray-800 font-semibold mt-4">Email:</p>
                      <p className="text-gray-600">[Email]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Status:
                      </p>
                      <p className="text-gray-600">[Status]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Contact Number:
                      </p>
                      <p className="text-gray-600">[Contact Number]</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">Course:</p>
                      <p className="text-gray-600">[Course]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Year Level:
                      </p>
                      <p className="text-gray-600">[Year Level]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Section:
                      </p>
                      <p className="text-gray-600">[Section]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Password:
                      </p>
                      <p className="text-gray-600">**********</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setCurrentView("changePassword")}
                      className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              {/* Change Password View */}
              {currentView === "changePassword" && (
                <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                  <div className="w-full max-w-[25rem] space-y-6">
                    <div className="flex flex-col">
                      <label className="text-gray-800 font-semibold">
                        Old Password:
                      </label>
                      <input
                        type="password"
                        className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-800 font-semibold">
                        New Password:
                      </label>
                      <input
                        type="password"
                        className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-800 font-semibold">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setCurrentView("account")}
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSavePassword}
                      className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* Personal Data View */}
              {currentView === "personalData" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[0.9rem]">
                    <div>
                      <p className="text-gray-800 font-semibold">Last Name:</p>
                      <p className="text-gray-600">[Last Name]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Middle Name:
                      </p>
                      <p className="text-gray-600">[Middle Name]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Address:
                      </p>
                      <p className="text-gray-600">[Address]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Gender:
                      </p>
                      <p className="text-gray-600">[Gender]</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">First Name:</p>
                      <p className="text-gray-600">[First Name]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Suffix:
                      </p>
                      <p className="text-gray-600">[Suffix]</p>
                      <p className="text-gray-800 font-semibold mt-4">
                        Birthday:
                      </p>
                      <p className="text-gray-600">[mm-dd-yyyy]</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setCurrentView("account")}
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
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
    </div>
  );
};

export default StudentProfile;
