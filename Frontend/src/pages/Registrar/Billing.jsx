import React, { useState } from "react";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";

const Billing = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [receivedMoney, setReceivedMoney] = useState("");
  const [applyFreeTuition, setApplyFreeTuition] = useState(false);
  const navigate = useNavigate();

  const totalAmount = 8290.0;
  const amountNeeded = applyFreeTuition ? 0 : totalAmount;
  const change = applyFreeTuition
    ? "P 0.00"
    : `P ${Math.max(0, receivedMoney - amountNeeded).toFixed(2)}`; // Format change as P 0.00 when CHED is applied

  const handleConfirmPayment = () => {
    // If CHED is applied, consider receivedMoney as 0
    const paymentReceived = applyFreeTuition ? 0 : parseFloat(receivedMoney);

    // Validate if payment is complete
    if (paymentReceived >= amountNeeded) {
      // Redirect to EvaluationPayment page
      navigate("/registrar/evaluate-payment", {
        state: { totalAmount, receivedMoney: paymentReceived, change },
      });
    } else {
      alert(
        "Please ensure the payment is complete before confirming payment."
      );
    }
  };

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
        className={`flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } w-full p-6`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">BILLING</h1>

          {/* Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Laboratory Fees */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Laboratory Fees
                </h2>
                <p className="text-sm text-gray-600">ComLab: P800.00</p>
              </div>

              {/* Other Fees */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Other Fees
                </h2>
                <p className="text-sm text-gray-600">NSTP: P0.00</p>
                <p className="text-sm text-gray-600">Reg. Fee: P55.00</p>
                <p className="text-sm text-gray-600">ID: P0.00</p>
                <p className="text-sm text-gray-600">Late Reg: P0.00</p>
                <p className="text-sm text-gray-600">Insurance: P25.00</p>
              </div>

              {/* Payment Section */}
              <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Payment
                </h2>
                <div className="space-y-4">
                  {/* Conditionally render "Received Money" input */}
                  {!applyFreeTuition && (
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm text-gray-600">
                        Received Money:
                      </label>
                      <input
                        type="number"
                        value={receivedMoney}
                        onChange={(e) => setReceivedMoney(e.target.value)}
                        className="border rounded-lg w-full p-2 text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Input received money..."
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <label className="w-1/4 text-sm text-gray-600">
                      Amount Needed to Pay:
                    </label>
                    <p className="w-full text-sm text-gray-600">
                      P {amountNeeded.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-sm text-gray-600">
                      Change:
                    </label>
                    <p className="w-full text-sm text-gray-600">{change}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      id="chedFreeTuition"
                      checked={applyFreeTuition}
                      onChange={() => setApplyFreeTuition(!applyFreeTuition)}
                    />
                    <label
                      htmlFor="chedFreeTuition"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Apply CHED Free Tuition and Misc. Free
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Assessment */}
              <div className="bg-white shadow-md rounded-lg p-6">
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
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Total Summary
                </h2>
                <p className="text-sm text-gray-600">Total Units: 21</p>
                <p className="text-sm text-gray-600">Total Hours: 31</p>
                <p className="text-sm text-gray-600">Total Amount: P8290.00</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => navigate("/registrar/enroll-student")}
                >
                  Back to Course
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
