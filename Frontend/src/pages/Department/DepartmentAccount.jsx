import React, { useState, useLayoutEffect } from "react";
import DepartmentSidebar from "./DepartmentSidebar";
import { useNavigate } from "react-router-dom";

const DepartmentAccount = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("account");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      {/* Sidebar */}
      <DepartmentSidebar
        onLogout={onLogout}
        currentPage="departmentDashboard"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onNavigate={(section) => {
          switch (section) {
            case "logout":
              navigate("/department");
              break;
            case "enroll":
              navigate("/departmentDashboard/enroll");
              break;
            case "list":
              navigate("/departmentDashboard/list");
              break;
            case "account":
              navigate("/departmentDashboard/account");
              break;
            default:
              break;
          }
        }}
        // Hide sidebar on mobile view
        className={isMobile ? "sidebar-collapsed" : ""}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
          isMobile
            ? "ml-[5rem] sm:ml-[0rem]" // No margin when sidebar is collapsed or on mobile view
            : "ml-[15.625rem] md:ml-[18rem] lg:ml-[0rem]" // Adjusted margin for expanded sidebar (desktop/tablet)
        } py-[2rem] px-[1rem] md:px-[2rem] lg:px-[4rem]`}
      >
        <div className="bg-white shadow-lg rounded-[1.875rem] p-8 max-w-[50rem] w-full mx-4 sm:mx-auto">
          <h1 className="text-[1.875rem] font-semibold text-gray-800 mb-4 text-center">
            User Account
          </h1>
          <hr className="border-t-[0.125rem] border-blue-500 mb-6 mx-auto w-[90%]" />

          {/* Account Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-[1rem] font-bold text-gray-700">Name:</p>
              <p className="text-[1rem] text-gray-700">[Name of Department]</p>
            </div>
            <div>
              <p className="text-[1rem] font-bold text-gray-700">Username:</p>
              <p className="text-[1rem] text-gray-700">[Username]</p>
            </div>
            <div>
              <p className="text-[1rem] font-bold text-gray-700">Password:</p>
              <p className="text-[1rem] text-gray-700">*************</p>
            </div>
            <div>
              <p className="text-[1rem] font-bold text-gray-700">
                Date Joined:
              </p>
              <p className="text-[1rem] text-gray-700">[Date Joined]</p>
            </div>
          </div>

          <p className="text-[0.875rem] text-gray-500 mt-6 text-center">
            Note: You can edit your account's password and personal data only.
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-600 text-white px-[1.5rem] py-[0.75rem] rounded-lg hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] lg:w-[45rem] md:w-[40rem] sm:w-[30rem] py-8 px-8">
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
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium">
                      Old Password *
                    </label>
                    <input
                      type="password"
                      className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      New Password *
                    </label>
                    <input
                      type="password"
                      className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Note: Saving this changes your data in the database.
                  </p>
                </div>
              )}

              {currentTab === "personalData" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Last Name *
                    </label>
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
  );
};

export default DepartmentAccount;
