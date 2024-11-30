import React from "react";
import Header from "./Header"; // Custom Header
import Sidebar from "./Sidebar"; // Custom Sidebar
import UniversityLogo from "../../images/universityLogo.svg"; // Path to your university logo
import { useNavigate } from "react-router-dom";

const COR = ({ onLogout }) => {
  const navigate = useNavigate();

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
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col">
      <Header onLogout={onLogout} />
      <div className="flex justify-center items-center bg-[#e4ecfa] py-3">
        <h1 className="text-[36px] font-extrabold text-[#000000] uppercase tracking-wide mt-5">
          Certificate of Registration
        </h1>
      </div>
      <div className="flex flex-1 justify-center items-center w-full h-auto pb-14">
        <Sidebar onNavigate={handleNavigate} />
        <div className="bg-white max-w-[57rem] w-full rounded-[20px] mt-10 shadow-lg p-8 relative">
          <div className="text-center mb-6">
            <img
              src={UniversityLogo}
              alt="University Logo"
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-[20px] font-bold uppercase">
              Cavite State University
            </h2>
            <p className="text-[16px] font-medium">Bacoor Campus</p>
            <h3 className="text-[18px] font-bold mt-4">Registration Form</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-[14px]">
            <div>
              <p><strong>Student Number:</strong> [20######]</p>
              <p><strong>Student Name:</strong> [Last Name], [First Name] [Middle Name]</p>
              <p><strong>Course:</strong> BSCS</p>
              <p><strong>Year:</strong> 2nd Year</p>
              <p><strong>Address:</strong> [Address]</p>
            </div>
            <div>
              <p><strong>Semester:</strong> 1st Semester</p>
              <p><strong>Date:</strong> [dd-mm-yyyy]</p>
              <p><strong>Section:</strong> [BSCS {`{Year}`} - {`{Section}`}]</p>
              <p><strong>School Year:</strong> [2024-2025]</p>
            </div>
          </div>
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
          <div className="grid grid-cols-2 gap-4 text-[14px] mb-6">
            <div>
              <p><strong>Old/New Student:</strong> Old Student</p>
              <p><strong>Registration Status:</strong> Transferee</p>
              <p><strong>Date of Birth:</strong> [Month Day, Year]</p>
            </div>
            <div>
              <p><strong>Gender:</strong> Non-Binary</p>
              <p><strong>Contact Number:</strong> [09#########]</p>
              <p><strong>Email Address:</strong> [Email@Email.com]</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p><strong>Student's Signature:</strong> ___________________________</p>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              onClick={() => console.log("Export PDF")}
            >
              EXPORT AS PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COR;
