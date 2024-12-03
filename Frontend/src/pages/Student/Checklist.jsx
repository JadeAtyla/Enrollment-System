import React from "react";
import Header from "./Header"; // Custom Header
import Sidebar from "./Sidebar"; // Custom Sidebar
import { useNavigate } from "react-router-dom";

const Checklist = ({ onLogout }) => {
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
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col">
      <Header onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar onNavigate={handleNavigate} />
        <div className="flex-1 p-8 flex flex-col items-center">
          <h1 className="text-[28px] font-extrabold text-center uppercase text-[#1d3557] mb-4 tracking-wide">
            Checklist of Courses
          </h1>
          <div className="bg-white max-w-[900px] w-full rounded-[20px] shadow-lg p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[16px] font-medium">
                  <strong>Name:</strong> [Name]
                </p>
                <p className="text-[16px] font-medium">
                  <strong>Student Number:</strong> [20######]
                </p>
                <p className="text-[16px] font-medium">
                  <strong>Address:</strong> [Address]
                </p>
              </div>
              <div className="flex justify-end items-center gap-4">
                <div>
                  <label className="block text-[16px] font-medium">Year:</label>
                  <select
                    className="border rounded-[10px] p-2 text-[14px] w-[100px]"
                    defaultValue="1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[16px] font-medium">
                    Semester:
                  </label>
                  <select
                    className="border rounded-[10px] p-2 text-[14px] w-[150px]"
                    defaultValue="1st Semester"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="text-center text-[16px] font-bold uppercase mb-4">
              [Year] [Semester]
            </p>
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-[#FFDA62] text-[14px] font-bold">
                  <th className="border p-2">Course Code</th>
                  <th className="border p-2">Course Title</th>
                  <th className="border p-2">Grade</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-[14px]">COSC 000</td>
                  <td className="border p-2 text-[14px]">
                    COMPUTER PROGRAMMING
                  </td>
                  <td className="border p-2 text-[14px]">Passed</td>
                  <td className="border p-2 text-[14px]">Completed</td>
                </tr>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="border p-2">&nbsp;</td>
                    <td className="border p-2">&nbsp;</td>
                    <td className="border p-2">&nbsp;</td>
                    <td className="border p-2">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="bg-[#1d3557] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#457b9d] transition-all"
                onClick={() => console.log("Export PDF")}
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
