import React, { useState } from "react";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";

const EvaluatePayment = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [receivedMoney, setReceivedMoney] = useState("");
  const [applyFreeTuition, setApplyFreeTuition] = useState(false);
  const navigate = useNavigate();

  const totalAmount = 8290.0;
  const amountNeeded = applyFreeTuition ? 0 : totalAmount;
  const change = Math.max(0, receivedMoney - amountNeeded).toFixed(2);

  const handleConfirmEnrollment = () => {
    // Redirect to CertificateOfRegistration page
    navigate("/registrar/certificate-of-registration");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="evaluate-payment"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex justify-center items-start transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } w-full p-6`}
      >
        <div className="w-full max-w-[80rem]">
          {/* Header */}
          <div className="text-left">
            <h1 className="text-[1.875rem] font-semibold text-gray-800">
              EVALUATE PAYMENT
            </h1>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Left Column: Laboratory Fees & Other Fees */}
            <div className="lg:col-span-5 space-y-8">
              {/* Laboratory Fees */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Laboratory Fees
                </h2>
                <p className="text-sm text-gray-600">ComLab: P800.00</p>
              </div>

              {/* Other Fees */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Other Fees
                </h2>
                <p className="text-sm text-gray-600">NSTP: P0.00</p>
                <p className="text-sm text-gray-600">Reg. Fee: P55.00</p>
                <p className="text-sm text-gray-600">ID: P0.00</p>
                <p className="text-sm text-gray-600">Late Reg: P0.00</p>
                <p className="text-sm text-gray-600">Insurance: P25.00</p>
              </div>
            </div>

            {/* Right Column: Assessment & Summary */}
            <div className="lg:col-span-7 space-y-8">
              {/* Assessment */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Assessment
                </h2>
                <p className="text-sm text-gray-600">Tuition Fee: P3200.00</p>
                <p className="text-sm text-gray-600">SFDF: P1500.00</p>
                <p className="text-sm text-gray-600">SRF: P2025.00</p>
                <p className="text-sm text-gray-600">Misc.: P435.00</p>
                <p className="text-sm text-gray-600">Athletics: P100.00</p>
                <p className="text-sm text-gray-600">SCUAA: P100.00</p>
                <p className="text-sm text-gray-600">Library Fee: P50.00</p>
                <p className="text-sm text-gray-600">Lab Fees: P800.00</p>
                <p className="text-sm text-gray-600">Other Fees: P80.00</p>
              </div>

              {/* Summary */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Total Summary
                </h2>
                <p className="text-sm text-gray-600">Total Units: 21</p>
                <p className="text-sm text-gray-600">Total Hours: 31</p>
                <p className="text-sm text-gray-600">Total Amount: P8290.00</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => navigate("/registrar/billing")}
            >
              Back to Billing
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleConfirmEnrollment}
            >
              Confirm Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatePayment;
