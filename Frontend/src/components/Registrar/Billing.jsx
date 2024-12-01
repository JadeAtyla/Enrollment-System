import React, { useState } from "react";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";

const Billing = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState("account");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="billing"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex justify-center items-start transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } w-full p-6`}
      >
        <div className="bg-white shadow-lg rounded-[1.875rem] p-8 w-full max-w-[50rem]">
          <h1 className="text-[1.875rem] font-semibold text-gray-800 mb-4 text-center">
            BILLING
          </h1>
          <hr className="border-t-[0.125rem] border-blue-500 mb-6 mx-auto w-[90%]" />

          {/* Billing Sections */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Laboratory Fees</h2>
                <div className="text-sm text-gray-600">
                  <p>ComLab: P800.00</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Other Fees</h2>
                <div className="text-sm text-gray-600">
                  <p>NSTP: P0.00</p>
                  <p>Reg. Fee: P55.00</p>
                  <p>ID: P0.00</p>
                  <p>Late Reg: P0.00</p>
                  <p>Insurance: P25.00</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Assessment</h2>
                <div className="text-sm text-gray-600">
                  <p>Tuition Fee: P3200.00</p>
                  <p>SFDF: P1500.00</p>
                  <p>SRF: P2025.00</p>
                  <p>Misc.: P435.00</p>
                  <p>Athletics: P100.00</p>
                  <p>SCUAA: P100.00</p>
                  <p>Library Fee: P50.00</p>
                  <p>Lab Fees: P800.00</p>
                  <p>Other Fees: P80.00</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Summary</h2>
                <div className="text-sm text-gray-600">
                  <p>Total Units: 21</p>
                  <p>Total Hours: 31</p>
                  <p>Total Amount: P8290.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Payment</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="w-1/4 text-sm text-gray-600">Received Money:</label>
                <input
                  type="text"
                  className="border rounded-lg w-full p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm text-gray-600">Amount Needed to Pay:</label>
                <p className="w-full text-sm text-gray-600">P8290.00</p>
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-sm text-gray-600">Change:</label>
                <p className="w-full text-sm text-gray-600">P0.00</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  id="chedFreeTuition"
                />
                <label htmlFor="chedFreeTuition" className="ml-2 text-sm text-gray-600">
                  Apply CHED Free Tuition and Misc. Free
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => navigate("/course")}
            >
              Back to Course
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Confirm Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
