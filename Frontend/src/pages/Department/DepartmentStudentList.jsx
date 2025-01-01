import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import StudentInfoModal from "./InformationModal"; // Import for editing student info
import { useNavigate } from "react-router-dom";

const DepartmentStudentList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState(
    Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      studentNumber: `2022${index + 1}`,
      name: `Student ${index + 1}`,
      program: index % 2 === 0 ? "Computer Science" : "Information Technology",
      yearLevel: `${(index % 4) + 1}th`,
      section: `Section ${(index % 3) + 1}`,
      status: index % 2 === 0 ? "Active" : "Inactive",
    }))
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentsPerPage = 10;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowDoubleClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleSaveStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    // Update the isMobile state based on window size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener to check for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
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
          isMobile || isSidebarCollapsed
            ? "ml-[5rem] sm:ml-[25rem] md:ml-[15rem] lg:ml-[7.5rem]" // No margin when sidebar is collapsed or on mobile view
            : "ml-[15.625rem] md:ml-[37rem] lg:ml-[18rem]" // Adjusted margin for expanded sidebar (desktop/tablet)
        } py-[2rem] px-[1rem] md:px-[2rem] lg:px-[4rem]`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-4 sm:px-6 py-4 mb-4 sm:mb-6 gap-4">
            {/* Search Bar and Filters in Mobile View */}
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-[8rem] md:w-[20rem] flex-1 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10 focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500">
                  <FaSearch />
                </span>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap sm:flex-nowrap sm:gap-4 w-full sm:w-auto md:flex-nowrap flex-col md:flex-row items-center gap-4">
                <select className="border border-gray-300 rounded-full px-4 py-2 pr-8 w-full sm:w-auto">
                  <option value="" disabled selected>
                    Select Year Level
                  </option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                </select>
                <select className="border border-gray-300 rounded-full px-4 py-2 pr-8 w-full sm:w-auto">
                  <option value="" disabled selected>
                    Select Course
                  </option>
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white shadow-lg rounded-[1.875rem] p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Department Student List
              </h1>
              <div className="flex items-center space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-green-700">
                  Export as Excel
                </button>
              </div>
            </div>

            <table className="w-full text-center border-collapse">
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
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(student)}
                  >
                    <td className="px-6 py-4 border-b">
                      {student.studentNumber}
                    </td>
                    <td className="px-6 py-4 border-b">{student.name}</td>
                    <td className="px-6 py-4 border-b">{student.program}</td>
                    <td className="px-6 py-4 border-b">{student.yearLevel}</td>
                    <td className="px-6 py-4 border-b">{student.section}</td>
                    <td className="px-6 py-4 border-b">{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && selectedStudent && (
        <StudentInfoModal
          instructor={selectedStudent}
          onClose={closeEditModal}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default DepartmentStudentList;
