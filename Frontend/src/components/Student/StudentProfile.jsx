import React, { useState } from "react";
import Header from "./Header";

const StudentProfile = ({ user }) => {
  const [currentView, setCurrentView] = useState("account"); // Tracks the current view (account, changePassword, personalData)

  const handleSavePassword = () => {
    alert("Password updated successfully!");
    setCurrentView("account"); // Redirect back to account details after saving
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
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
        <div className="flex justify-between items-center px-12 py-4">
          <button
            onClick={() => setCurrentView("account")}
            className={`pb-2 text-xl font-bold ${
              currentView === "account" || currentView === "changePassword"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setCurrentView("personalData")}
            className={`pb-2 text-xl font-bold ${
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
              <p className="text-gray-800 font-semibold">Student Number:</p>
              <p className="text-gray-600">{user?.studentNumber || "[Student Number]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Email:</p>
              <p className="text-gray-600">{user?.email || "[Email]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Status:</p>
              <p className="text-gray-600">{user?.status || "[Status]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Contact Number:</p>
              <p className="text-gray-600">{user?.contactNumber || "[Contact Number]"}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Course:</p>
              <p className="text-gray-600">{user?.course || "[Course]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Year Level:</p>
              <p className="text-gray-600">{user?.yearLevel || "[Year Level]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Section:</p>
              <p className="text-gray-600">{user?.section || "[Section]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Password:</p>
              <p className="text-gray-600">**********</p>
            </div>
            <div className="col-span-2 flex justify-between mt-6">
              <button
                onClick={() => setCurrentView("personalData")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentView("changePassword")}
                className="bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {currentView === "changePassword" && (
          <div className="p-12">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-800 font-semibold">Old Password:</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold">New Password:</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold">Confirm Password:</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentView("account")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full"
              >
                Back
              </button>
              <button
                onClick={handleSavePassword}
                className="bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {currentView === "personalData" && (
          <div className="p-12 grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-800 font-semibold">Last Name:</p>
              <p className="text-gray-600">{user?.lastName || "[Last Name]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Middle Name:</p>
              <p className="text-gray-600">{user?.middleName || "[Middle Name]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Address:</p>
              <p className="text-gray-600">{user?.address || "[Address]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Gender:</p>
              <p className="text-gray-600">{user?.gender || "[Gender]"}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">First Name:</p>
              <p className="text-gray-600">{user?.firstName || "[First Name]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Suffix:</p>
              <p className="text-gray-600">{user?.suffix || "[Suffix]"}</p>
              <p className="text-gray-800 font-semibold mt-4">Birthday:</p>
              <p className="text-gray-600">{user?.birthday || "[mm-dd-yyyy]"}</p>
            </div>
            <div className="col-span-2 flex justify-center mt-6">
              <button
                onClick={() => setCurrentView("account")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full"
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
