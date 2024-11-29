import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const StudentProfile = ({ user }) => {
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
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      <Sidebar onNavigate={handleNavigate} />

      {/* Header */}
      <Header />

      {/* Main Container */}
      <div
        className="relative mx-auto mt-12 bg-white rounded-[34px] shadow-lg"
        style={{
          width: "1054px",
          height: "610px",
        }}
      >
        {/* Tabs */}
        <div className="flex justify-between items-center px-12 py-4 border-b border-gray-300">
          <button
            onClick={() => setCurrentView("account")}
            className={`pb-2 text-xl font-bold transition ${
              currentView === "account" || currentView === "changePassword"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setCurrentView("personalData")}
            className={`pb-2 text-xl font-bold transition ${
              currentView === "personalData"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Personal Data
          </button>
        </div>

        {/* Conditional Views */}
        {currentView === "account" && (
          <div className="p-12 grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-800 font-semibold mb-2">Student Number:</p>
              <p className="text-gray-600">{user?.studentNumber || "[Student Number]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Email:</p>
              <p className="text-gray-600">{user?.email || "[Email]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Status:</p>
              <p className="text-gray-600">{user?.status || "[Status]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Contact Number:</p>
              <p className="text-gray-600">{user?.contactNumber || "[Contact Number]"}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">Course:</p>
              <p className="text-gray-600">{user?.course || "[Course]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Year Level:</p>
              <p className="text-gray-600">{user?.yearLevel || "[Year Level]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Section:</p>
              <p className="text-gray-600">{user?.section || "[Section]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Password:</p>
              <p className="text-gray-600">**********</p>
            </div>
            <div className="col-span-2 flex justify-between mt-8">
              <button
                onClick={() => setCurrentView("personalData")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentView("changePassword")}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {currentView === "changePassword" && (
          <div className="p-12 space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold">Old Password:</label>
              <input
                type="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold">New Password:</label>
              <input
                type="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold">Confirm Password:</label>
              <input
                type="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-between mt-6">
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

        {currentView === "personalData" && (
          <div className="p-12 grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-800 font-semibold mb-2">Last Name:</p>
              <p className="text-gray-600">{user?.lastName || "[Last Name]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Middle Name:</p>
              <p className="text-gray-600">{user?.middleName || "[Middle Name]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Address:</p>
              <p className="text-gray-600">{user?.address || "[Address]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Gender:</p>
              <p className="text-gray-600">{user?.gender || "[Gender]"}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold mb-2">First Name:</p>
              <p className="text-gray-600">{user?.firstName || "[First Name]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Suffix:</p>
              <p className="text-gray-600">{user?.suffix || "[Suffix]"}</p>

              <p className="text-gray-800 font-semibold mt-6 mb-2">Birthday:</p>
              <p className="text-gray-600">{user?.birthday || "[mm-dd-yyyy]"}</p>
            </div>
            <div className="col-span-2 flex justify-center mt-8">
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
  );
};

export default StudentProfile;
