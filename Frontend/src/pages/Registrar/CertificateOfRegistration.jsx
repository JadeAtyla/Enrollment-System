import React, { useState } from "react";
import universityLogo from "../../images/universityLogo.svg";
import RegistrarSidebar from "./RegistrarSidebar";

function CertificateOfRegistration({ onLogout }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Define year and section dynamically
  const year = "2nd Year";
  const section = "A";

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="certificate"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } flex justify-center w-full py-10`}
      >
        <div className="w-full max-w-[57rem]">
          {/* Certificate of Registration Title */}
          <div className="text-center mb-8">
            <h1 className="text-[36px] font-extrabold text-[#000000] uppercase tracking-wide">
              Certificate of Registration
            </h1>
          </div>

          {/* Main Content */}
          <div className="flex justify-center items-center bg-[#e4ecfa] py-3">
            <div className="bg-white w-full rounded-[20px] shadow-lg p-8">
              {/* Header Section */}
              <div className="text-center mb-6">
                <img
                  src={universityLogo}
                  alt="University Logo"
                  className="h-16 mx-auto mb-4"
                />
                <h2 className="text-[20px] font-bold uppercase">
                  Cavite State University
                </h2>
                <p className="text-[16px] font-medium">Bacoor Campus</p>
                <h3 className="text-[18px] font-bold mt-4">Registration Form</h3>
              </div>

              {/* Student Info Section */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-[14px]">
                <div>
                  <p>
                    <strong>Student Number:</strong> [20######]
                  </p>
                  <p>
                    <strong>Student Name:</strong> [Last Name], [First Name]
                    [Middle Name]
                  </p>
                  <p>
                    <strong>Course:</strong> BSCS
                  </p>
                  <p>
                    <strong>Year:</strong> {year}
                  </p>
                  <p>
                    <strong>Address:</strong> [Address]
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Semester:</strong> 1st Semester
                  </p>
                  <p>
                    <strong>Date:</strong> [dd-mm-yyyy]
                  </p>
                  <p>
                    <strong>Section:</strong> BSCS {year} - {section}
                  </p>
                  <p>
                    <strong>School Year:</strong> [2024-2025]
                  </p>
                </div>
              </div>

              {/* Course Table */}
              <table className="w-full text-left border-collapse mb-6 text-[14px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">COURSE CODE</th>
                    <th className="border p-2">COURSE TITLE</th>
                    <th className="border p-2">UNITS</th>
                    <th className="border p-2">TIME</th>
                    <th className="border p-2">DAY</th>
                    <th className="border p-2">ROOM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">COSC 000</td>
                    <td className="border p-2">NAKAKA STRESS KA SIR HAHAHAHA</td>
                    <td className="border p-2">3</td>
                    <td className="border p-2">7:30 AM</td>
                    <td className="border p-2">MONDAY</td>
                    <td className="border p-2">COMLAB 1</td>
                  </tr>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Fee and Assessment Section */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-bold mb-2">Lab Fees</h3>
                  <p>ComLab: ₱800.00</p>

                  <h3 className="font-bold mt-4 mb-2">Other Fees</h3>
                  <ul className="list-none">
                    <li>NSTP</li>
                    <li>Reg. Fee</li>
                    <li>ID</li>
                    <li>Late Fee</li>
                    <li>Insurance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Assessment</h3>
                  <ul className="list-none">
                    <li>Tuition Fee</li>
                    <li>SRF</li>
                    <li>Athletics</li>
                    <li>Library Fee</li>
                    <li>Other Fees</li>
                  </ul>
                  <p className="font-bold mt-4">Total UNITS: 21</p>
                  <p className="font-bold">Total HOURS: 31</p>
                  <p className="font-bold">Total AMOUNT: ₱3800.00</p>
                </div>
              </div>

              {/* Notes and Action Section */}
              <div className="mt-6 text-xs">
                <p>
                  <strong>NOTE:</strong> Your slots on the above subjects will
                  be confirmed only upon payment.
                </p>
              </div>
              <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Print PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateOfRegistration;
