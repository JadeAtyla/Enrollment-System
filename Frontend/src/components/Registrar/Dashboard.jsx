import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileIcon from "../../images/Registrar/DashboardIcons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20; // Rows per page
  const totalRows = 50; // Total rows for demonstration

  const handleNavigate = (section) => {
    switch (section) {
      case "dashboard":
        navigate("/registrar/dashboard");
        break;
      case "profile":
        navigate("/registrar/profile");
        break;
      case "cor":
        navigate("/registrar/cor");
        break;
      case "checklist":
        navigate("/registrar/checklist");
        break;
      default:
        break;
    }
  };

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

  return (
    <div className="min-h-[120vh] w-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col">
      {/* Sidebar */}
      <div className="flex flex-row">
        <Sidebar onNavigate={handleNavigate} />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="flex flex-col items-center px-6 py-4">
            {/* Welcome Section */}
            <div className="w-full flex justify-between items-center max-w-[1200px] mb-4">
              <h1 className="text-[24px] font-bold text-[#333]">
                Welcome! <span className="font-regular">[Name]</span>
              </h1>
            </div>

            {/* Registrar Info Card */}
            <div className="bg-white rounded-[34px] shadow-lg w-full max-w-[1200px] flex items-center justify-between p-6 mb-6">
              <div className="flex items-center">
                <img
                  src={ProfileIcon}
                  alt="Profile Icon"
                  className="h-[90px] w-[90px] rounded-full mr-4"
                />
                <div>
                  <h2 className="text-[20px] font-bold">[Registrar Name]</h2>
                  <p className="text-[16px] text-[#666]">[Username]</p>
                  <p className="text-[16px] text-[#666]">[Date Joined]</p>
                </div>
              </div>
              <p className="text-[16px] font-bold text-[#555]">Role: Registrar</p>
            </div>

            {/* Filters and Actions */}
            <div className="w-full max-w-[1200px] flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="border border-gray-300 rounded-[20px] px-4 py-2 w-[300px] pl-10"
                  />
                  <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500">
                    <FaSearch />
                  </span>
                </div>
                <select
                  className="border border-gray-300 rounded-[20px] px-4 py-2"
                  defaultValue="Year Level"
                >
                  <option disabled>Year Level</option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
                <select
                  className="border border-gray-300 rounded-[20px] px-4 py-2"
                  defaultValue="Course"
                >
                  <option disabled>Course</option>
                  <option>BSIT</option>
                  <option>BSCS</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button className="bg-[#198754] text-white px-4 py-2 rounded-[20px]">
                  Export as Excel
                </button>
                <button className="bg-[#0d6efd] text-white px-4 py-2 rounded-[20px]">
                  + Add Student
                </button>
              </div>
            </div>

            {/* Student List Table */}
            <div className="bg-white rounded-[34px] shadow-lg w-full max-w-[1200px] mb-6">
              <table className="w-full border-collapse ">
                <thead>
                  <tr className="bg-gray-200 text-center text-[#333] font-bold">
                    <th className="p-4 border-b">Student Number</th>
                    <th className="p-4 border-b">Student Name</th>
                    <th className="p-4 border-b">Course</th>
                    <th className="p-4 border-b">Year Level</th>
                    <th className="p-4 border-b">Section</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b">Enroll</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rowsPerPage }).map((_, idx) => {
                    const rowNumber = startRow + idx;
                    if (rowNumber > totalRows) return null;
                    return (
                      <tr
                        key={rowNumber}
                        className={`${
                          idx % 2 === 0 ? "bg-gray-50 text-center" : "bg-white text-center"
                        } text-[#333]` } 
                      >
                        <td className="p-4 border-b">202210{rowNumber.toString().padStart(4, "0")}</td>
                        <td className="p-4 border-b">Karlos, Juan M.</td>
                        <td className="p-4 border-b">BSCS</td>
                        <td className="p-4 border-b">Third Year</td>
                        <td className="p-4 border-b">Regular</td>
                        <td className="p-4 border-b">Regular</td>
                        <td className="p-4 border-b">
                          <button className="bg-[#0d6efd] text-white px-4 py-2 rounded-full">
                            Enroll Student
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2 pb-5">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#bdb290] text-black hover:bg-[#807861]"
                }`}
              >
                &lt;
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-[#FFDA62] text-gray-600 hover:bg-gray-700 hover:text-white"
                      : "bg-[#FFDA62] text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#bdb290] text-black hover:bg-[#807861]"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
