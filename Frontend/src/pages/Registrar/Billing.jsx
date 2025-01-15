import React, { useState, useEffect } from "react";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useData from "../../components/DataUtil";
import { useAlert } from "../../components/Alert";

const Billing = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [receivedMoney, setReceivedMoney] = useState(0);
  const [applyFreeTuition, setApplyFreeTuition] = useState(true);
  const [change, setChange] = useState("P 0.00"); // Initialize `change` with a default value
  const navigate = useNavigate();
  const location = useLocation();

  const { student, courses, billings } = location.state || {}; // Default billings to an empty array
  const { data, error, createData } = useData("/api/batch/");

  const [totalFees, setTotalFees] = useState(0);
  // const totalAmount = 8290.0;
  const amountNeeded = applyFreeTuition ? totalFees : totalFees;
  const {triggerAlert} = useAlert();

  const { studentId } = useParams();
    
    useEffect(()=>{
        if (!studentId) navigate(`/registrar/enroll-student/${student.id}`, {state: {student: student}});
    }, [studentId]);

  // Dynamically calculate `change` when `receivedMoney` or `applyFreeTuition` changes
  useEffect(() => {
    const numericMoney = parseFloat(receivedMoney) || 0; // Ensure receivedMoney is a valid number
    const calculatedChange = applyFreeTuition
      ? 0 // No change when CHED is applied
      : Math.max(0, amountNeeded - numericMoney);

    setChange(`P ${calculatedChange.toFixed(2)}`); // Update `change`
  }, [receivedMoney, applyFreeTuition]);

  const labFess = billings.filter(item => item.billing?.category === "LAB_FEES");
  const otherFess = billings.filter(item => item.billing?.category === "OTHER_FEES");
  const assessmentFees = billings.filter(item => item.billing?.category === "ASSESSMENT");

  const handleConfirmPayment = async () => {
    try {
      const payload = {
        student_id: student?.id,
        course_ids: courses || [],
        voucher: applyFreeTuition,
        paid: parseFloat(receivedMoney) || 0, // Ensure valid numeric data
      };
      
      await createData(payload);

    } catch (err) {
      console.error("Error in payment confirmation:", err);
      alert("An unexpected error occurred. Please contact support.");
    }
  };

  useEffect(()=>{
    const labFeesTotal = parseFloat(
      (labFess?.reduce((sum, fee) => sum + (parseFloat(fee.price) || 0), 0) || 0).toFixed(2)
    );
    const otherFeesTotal = parseFloat(
      (otherFess?.reduce((sum, fee) => sum + (parseFloat(fee.price) || 0), 0) || 0).toFixed(2)
    );
    const assessmentFeesTotal = parseFloat(
      (assessmentFees?.reduce((sum, fee) => sum + (parseFloat(fee.price) || 0), 0) || 0).toFixed(2)
    );
    
    const totalFee = parseFloat((labFeesTotal + otherFeesTotal + assessmentFeesTotal || 0).toFixed(2));
    
    setTotalFees(totalFee);    
    
    if (data?.success) {
      triggerAlert("success", "Success", "Student enrolled successfully.");
      // navigate("/registrar/evaluate-payment", { state: { totalAmount, receivedMoney, change } });
      navigate(`/registrar/certificate-of-registration/${student.id}`);
    } 
    if (error) {
      console.log(error?.data);
    
      // Check if errors array exists and has content
      if (error?.data?.error?.errors) {
        // Loop through each error in the errors array
        for (const errorDetail of error.data.error.errors) {
          // Log each error's message
          console.log(errorDetail?.error);
    
          // Optionally trigger an alert for each error message
          triggerAlert("error", "Error", errorDetail?.error || "Unknown error occurred.");
        }
      }
    
      // Fallback for general error message
      triggerAlert("error", "Error", error?.data?.error?.message || "Error enrolling this student.");
    }    
  }, [data, error]);

  const handleBack = () => {
    navigate(`/registrar/enroll-student/${student.id}`, { state: { student: student } });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="billing"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={setIsSidebarCollapsed}
      />

      <div
        className={`flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } w-full p-6`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">BILLING</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Lab Fees</h2>
                {labFess.map((fees, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {fees?.billing?.name}: P{fees?.price || 0.0}
                  </p>
                ))}
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Other Fees</h2>
                {otherFess.map((fees, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {fees?.billing?.name}: P{fees?.price || 0.0}
                  </p>
                ))}
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment</h2>
                <div className="space-y-4">
                  {!applyFreeTuition && (
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm text-gray-600">Received Money:</label>
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
                    <label className="w-1/4 text-sm text-gray-600">Amount Needed to Pay:</label>
                    <p className="w-full text-sm text-gray-600">P {amountNeeded.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 text-sm text-gray-600">Change:</label>
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
                    <label htmlFor="chedFreeTuition" className="ml-2 text-sm text-gray-600">
                      Apply CHED Free Tuition and Misc. Free
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Assessment</h2>
                {assessmentFees.map((fees, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {fees?.billing?.name}: P{fees?.price || 0.0}
                  </p>
                ))}
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Summary</h2>
                <p className="text-sm text-gray-600">Total Units: 21</p>
                <p className="text-sm text-gray-600">Total Hours: 31</p>
                <p className="text-sm text-gray-600">Total Amount: {totalFees.toFixed(2)}</p>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => handleBack()}
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