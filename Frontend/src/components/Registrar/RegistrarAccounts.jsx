import React, { useState } from "react";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";

const RegistrarAccounts = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("account");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="account"
        onNavigate={(section) => {
          if (section === "logout") {
            navigate("/registrar");
          } else if (section === "dashboard") {
            navigate("/registrar/dashboard");
          } else if (section === "enroll") {
            navigate("/registrar/enroll");
          } else if (section === "list") {
            navigate("/registrar/list");
          }
        }}
      />

      {/* Main Content */}
      <div className=" flex flex-col-3 items-center bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] py-[2rem] px-[2rem]">
        <div className="w-full min-w-[60.5rem] max-w-[87.5rem]">
          {/* Account View */}
          {!isEditing && (
            <div className="flex flex-col bg-white shadow-lg rounded-[1.875rem] p-8">
              <h1 className="text-[1.875rem] font-semibold text-gray-800 mb-4 text-center">
                User Account
              </h1>
              <hr className="border-t-[2px] border-blue-500 mb-6" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-700">
                    <strong>Name:</strong> [Name of Registrar]
                  </p>
                  <p className="text-lg text-gray-700 mt-4">
                    <strong>Password:</strong> *************
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-700">
                    <strong>Username:</strong> [Username]
                  </p>
                  <p className="text-lg text-gray-700 mt-4">
                    <strong>Date Joined:</strong> [Date Joined]
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Note: You can edit your account's password and personal data only.
              </p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}

          {/* Modal for Editing */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg w-[40rem] py-8 px-8">
                {/* Modal Tabs */}
                <div className="flex justify-between text-lg font-semibold mb-6 border-b-2">
                  <button
                    onClick={() => setCurrentTab("account")}
                    className={`w-1/2 pb-2 text-center ${
                      currentTab === "account"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Account
                  </button>
                  <button
                    onClick={() => setCurrentTab("personalData")}
                    className={`w-1/2 pb-2 text-center ${
                      currentTab === "personalData"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Personal Data
                  </button>
                </div>

                {/* Modal Content */}
                <div>
                  {currentTab === "account" && (
                    <div className="grid gap-6 ">
                      <div>
                        <label className="block text-sm font-medium">Old Password *</label>
                        <input
                          type="password"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">New Password *</label>
                        <input
                          type="password"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Confirm Password *</label>
                        <input
                          type="password"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <p className="text-sm text-gray-500 ">
                        Note: Saving this changes your data in the database.
                      </p>
                    </div>
                    
                  )}

                  {currentTab === "personalData" && (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium">First Name *</label>
                        <input
                          type="text"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Middle Name</label>
                        <input
                          type="text"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Last Name *</label>
                        <input
                          type="text"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Suffix</label>
                        <input
                          type="text"
                          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <p className="text-sm text-gray-500 col-span-2">
                        Note: Saving this changes your data in the database.
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    onClick={() => setIsEditing(false)}
                  >
                    Back
                  </button>
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrarAccounts;
