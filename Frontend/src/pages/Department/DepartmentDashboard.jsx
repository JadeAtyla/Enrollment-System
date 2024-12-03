import React, { useState } from "react";
import DepartmentSidebar from "./DepartmentSidebar";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ProfileIcon from "../../images/Department/DashboardIcons/ProfileIcon.svg";
import StudentIcon from "../../images/Department/DashboardIcons/StudentIcon.svg";
import IrregularIcon from "../../images/Department/DashboardIcons/IrregularIcon.svg";
import { useNavigate } from "react-router-dom";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentDashboard = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Data for the pie chart
  const pieData = {
    labels: ["Regular", "Irregular", "Transferee", "Returnee"],
    datasets: [
      {
        label: "Students",
        data: [1000, 800, 150, 50],
        backgroundColor: ["#22C55E", "#EF4444", "#3B82F6", "#FACC15"],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

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
      />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } py-[2rem] px-[2rem]`}
      >
          <div className="w-full max-w-[87.5rem]">
      
            {/* Department Welcome Header */}
            <header className="flex justify-between items-center mb-[1.5rem]">
              <h1 className="text-[1.875rem] font-semibold text-gray-800">
                Welcome! <span className="font-normal">[Department Name]</span>
              </h1>
            </header>

            {/* Department Info Card */}
            <div className="bg-white shadow-lg rounded-[1.875rem] p-[1.5rem] mb-[1.5rem] flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={ProfileIcon}
                  alt="Profile Icon"
                  className="h-[5rem] w-[5rem] rounded-full mr-[1rem]"
                />
                <div>
                  <h2 className="text-[1.25rem] font-semibold">[Department Name]</h2>
                  <p className="text-gray-600 text-[0.875rem]">[Username]</p>
                  <p className="text-gray-600 text-[0.875rem]">[Date Joined]</p>
                </div>
              </div>
              <div className="text-[1.125rem] font-semibold text-gray-700">
                Role: Department
              </div>
            </div>


            {/* Stats and Pie Chart Section */}
            <div className="flex flex-cols gap-[1rem] mb-[1.5rem]">
              {/* Total Students Card */}
              <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[21.5rem] w-[10rem]">
                <img
                  src={StudentIcon}
                  alt="Total Students"
                  className="h-[4rem] w-[4rem] mx-auto mb-[1rem]"
                />
                <h3 className="text-base font-medium text-gray-500">Total Students</h3>
                <p className="text-2xl font-bold mb-[1rem]">3,000</p>
                <hr className="border-t border-gray-300 mb-[1rem]" />
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-500">BSCS</p>
                    <p className="text-xl font-bold">1,500</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">BSIT</p>
                    <p className="text-xl font-bold">1,500</p>
                  </div>
                </div>
              </div>

              {/* Smaller Cards */}
              <div className="grid grid-cols-2 gap-[1rem]">
                <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[10rem]">
                  <img
                    src={StudentIcon}
                    alt="Regular Students"
                    className="h-[3rem] w-[3rem] mx-auto mb-[0.5rem]"
                  />
                  <h3 className="text-sm font-medium text-gray-500">Regular</h3>
                  <p className="text-xl font-bold">1,000</p>
                </div>
                <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[10rem]">
                  <img
                    src={IrregularIcon}
                    alt="Irregular Students"
                    className="h-[3rem] w-[3rem] mx-auto mb-[0.5rem]"
                  />
                  <h3 className="text-sm font-medium text-gray-500">Irregular</h3>
                  <p className="text-xl font-bold">800</p>
                </div>
                <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[10rem]">
                  <img
                    src={StudentIcon}
                    alt="Returnee Students"
                    className="h-[3rem] w-[3rem] mx-auto mb-[0.5rem]"
                  />
                  <h3 className="text-sm font-medium text-gray-500">Returnee</h3>
                  <p className="text-xl font-bold">50</p>
                </div>
                <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[10rem]">
                  <img
                    src={StudentIcon}
                    alt="Transferee Students"
                    className="h-[3rem] w-[3rem] mx-auto mb-[0.5rem]"
                  />
                  <h3 className="text-sm font-medium text-gray-500">Transferee</h3>
                  <p className="text-xl font-bold">150</p>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white shadow rounded-[1.875rem] p-6 text-center h-[21rem] w-[40rem] flex flex-col items-center justify-center">
                <div className="h-[12rem] w-[12rem]">
                  <Doughnut data={pieData} options={pieOptions} />
                </div>
                <div className="grid grid-cols-2 gap-[0.5rem] text-sm mt-4 text-center">
                  <div className="flex items-center justify-center">
                    <span className="h-[1rem] w-[1rem] bg-green-500 rounded-full mr-2"></span>
                    Regular
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="h-[1rem] w-[1rem] bg-red-500 rounded-full mr-2"></span>
                    Irregular
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="h-[1rem] w-[1rem] bg-blue-500 rounded-full mr-2"></span>
                    Transferee
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="h-[1rem] w-[1rem] bg-yellow-500 rounded-full mr-2"></span>
                    Returnee
                  </div>
                </div>
              </div>
            </div>

            {/* Program Breakdown Section */}
            <div className="bg-white shadow-lg rounded-[1.875rem] p-6">
              {/* Top Section: Dropdown and Legend */}
              <div className="flex justify-between items-center mb-6">
                {/* Program Selector */}
                <div className="flex items-center gap-4">
                  <label htmlFor="program" className="font-bold text-gray-800">
                    PROGRAM
                  </label>
                  <select
                    id="program"
                    className="border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 w-[rem]"
                  >
                    <option value="BSCS">BSCS</option>
                    <option value="BSIT">BSIT</option>
                  </select>
                </div>

                {/* Legend */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-700">1st Year</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-700">2nd Year</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-700">3rd Year</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-700">4th Year</p>
                  </div>
                </div>
              </div>

              {/* Data Section */}
              <div className="grid grid-cols-5 gap-y-4 text-center">
                {/* Row 1: Number of Students */}
                <p className="font-semibold text-gray-700 col-span-1">Number Students</p>
                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <p className="text-lg font-medium text-gray-700">1000</p>
                  <p className="text-lg font-medium text-gray-700">1000</p>
                  <p className="text-lg font-medium text-gray-700">1000</p>
                  <p className="text-lg font-medium text-gray-700">1000</p>
                </div>

                {/* Row 2: Student Bars */}
                <p className="font-semibold text-gray-700 col-span-1"></p>
                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <div className="h-2 bg-red-500 rounded-full"></div>
                  <div className="h-2 bg-blue-500 rounded-full"></div>
                  <div className="h-2 bg-yellow-500 rounded-full"></div>
                  <div className="h-2 bg-green-500 rounded-full"></div>
                </div>

                {/* Row 3: Number of Sections */}
                <p className="font-semibold text-gray-700 col-span-1">Sections</p>
                <div className="col-span-4 grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-medium text-gray-700">3</p>
                    <div className="h-2 bg-red-500 rounded-full w-full"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-medium text-gray-700">7</p>
                    <div className="h-2 bg-blue-500 rounded-full w-full"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-medium text-gray-700">4</p>
                    <div className="h-2 bg-yellow-500 rounded-full w-full"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-medium text-gray-700">4</p>
                    <div className="h-2 bg-green-500 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div >
    </div>


  );
};

export default DepartmentDashboard;
