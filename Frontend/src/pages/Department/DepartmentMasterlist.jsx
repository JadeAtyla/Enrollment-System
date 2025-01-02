import React, { useState, useLayoutEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import DepartmentAddCourse from "./DepartmentAddCourse";
import { useNavigate } from "react-router-dom";

const DepartmentMasterList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [students] = useState(
    Array.from({ length: 15 }).map((_, index) => ({
      id: index + 1,
      studentNumber: "202211111",
      name: "Karlos, Juan M.",
      program: "BSCS",
      yearLevel: "3",
      section: "3",
      status: "Regular",
    }))
  );

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  const studentsPerPage = 10;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
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
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isMobile
            ? "ml-[12rem]" // No margin when sidebar is collapsed or on mobile view
            : "ml-[15.625rem] md:ml-[19rem] lg:ml-[0rem]" // Adjusted margin for expanded sidebar (desktop/tablet)
        } py-[2rem] px-[1rem] md:px-[2rem] lg:px-[4rem]`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-4 sm:px-6 py-4 mb-4 sm:mb-6 gap-4">
            <div className="relative flex items-center w-[20rem] border border-gray-300 rounded-full px-4 py-1">
              <div className="flex-shrink-0 text-gray-500">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2 w-full bg-transparent border-none focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Course</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Year Level</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Section</option>
              </select>
            </div>
          </div>

          {/* Masterlist Table */}
          <div className="shadow rounded-[1.875rem] bg-white p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[1.875rem] font-semibold text-gray-800">
                MASTERLIST
              </h1>
              <div className="flex gap-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition-transform transform hover:scale-105">
                  Export as Excel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                  onClick={() => setIsAddCourseModalOpen(true)}
                >
                  + Add Course
                </button>
              </div>
            </div>
            <table className="w-full border-collapse text-gray-800">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b">Student Number</th>
                  <th className="px-6 py-4 border-b">Student Name</th>
                  <th className="px-6 py-4 border-b">Program</th>
                  <th className="px-6 py-4 border-b">Year Level</th>
                  <th className="px-6 py-4 border-b">Section</th>
                  <th className="px-6 py-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-center">
                      {student.studentNumber}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {student.program}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {student.yearLevel}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {student.section}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-6">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => alert("Load more functionality!")}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <DepartmentAddCourse
          onClose={() => setIsAddCourseModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default DepartmentMasterList;
