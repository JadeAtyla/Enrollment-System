import React, { useState, useLayoutEffect, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import InformationModal from "./InformationModal"; // Import for editing student info
import { useNavigate } from "react-router-dom";
import useData from "../../components/DataUtil";

const DepartmentStudentList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const studentsPerPage = 10;

  const apiURL = `/api/student/`;
  const { data, error, getData, updateData } = useData(apiURL);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    yearLevel: "",
    program: "",
  });

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData]);

  useEffect(() => {
    if (data) {
      setStudents(data);
    } else if (error) {
      console.error(error?.error);
    }
  }, [data, error, updateData]);

  const handleRowDoubleClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleSaveStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student?.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setIsEditModalOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredStudents = students?.filter((student) => {
    const matchesSearch =
      !filters.search ||
      student?.first_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      student?.last_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      student?.id?.toString().includes(filters.search);

    const matchesYearLevel =
      !filters.yearLevel || student?.year_level === parseInt(filters.yearLevel);

    const matchesProgram =
      !filters.program || student?.program === filters.program;

    return matchesSearch && matchesYearLevel && matchesProgram;
  }) || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="flex min-h-screen">
      <DepartmentSidebar
        onLogout={onLogout}
        currentPage="departmentStudentList"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onNavigate={(section) => {
          switch (section) {
            case "logout":
              navigate("/department");
              break;
            case "enroll":
              navigate("/departmentStudentList/enroll");
              break;
            case "list":
              navigate("/departmentStudentList/list");
              break;
            case "account":
              navigate("/departmentStudentList/account");
              break;
            default:
              break;
          }
        }}
        className={isMobile ? "sidebar-collapsed" : ""}
      />

      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isMobile
            ? "ml-[12rem]"
            : "ml-[15.625rem] md:ml-[20rem] lg:ml-[0rem]"
        } py-[2rem] px-[1rem] md:px-[2rem] lg:px-[4rem]`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-4 sm:px-6 py-4 mb-4 sm:mb-6 gap-4">
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full items-center gap-4">
              <div className="relative flex items-center w-[20rem] border border-gray-300 rounded-full px-4 py-1">
                <div className="flex-shrink-0 text-gray-500">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="ml-2 w-full bg-transparent border-none focus:outline-none focus:ring-0"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap md:flex-nowrap flex-col md:flex-row items-center gap-4 sm:gap-4 md:ml-auto">
                <select
                  className="border border-gray-300 rounded-full px-4 py-2 pr-8 w-full sm:w-auto"
                  onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
                  value={filters.yearLevel}
                >
                  <option value="">Select Year Level</option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                </select>
                <select
                  className="border border-gray-300 rounded-full px-4 py-2 pr-8 w-full sm:w-auto"
                  onChange={(e) => setFilters({ ...filters, program: e.target.value })}
                  value={filters.program}
                >
                  <option value="">Select Course</option>
                  <option>BSIT</option>
                  <option>BSCS</option>
                </select>
              </div>
            </div>
          </div>

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
                    key={student?.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(student)}
                  >
                    <td className="px-6 py-4 border-b">
                      {student?.id}
                    </td>
                    <td className="px-6 py-4 border-b">{student?.last_name}, {student?.middle_name} {student?.first_name}</td>
                    <td className="px-6 py-4 border-b">{student?.program}</td>
                    <td className="px-6 py-4 border-b">{student?.year_level}</td>
                    <td className="px-6 py-4 border-b">{student?.section}</td>
                    <td className="px-6 py-4 border-b">{student?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-center md:justify-between items-center mt-6 gap-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-center">
              Page {currentPage} of{" "}
              {Math.ceil(filteredStudents.length / studentsPerPage)}
            </p>
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredStudents.length / studentsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && selectedStudent && (
        <InformationModal
          url={apiURL}
          data={selectedStudent}
          onClose={closeEditModal}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default DepartmentStudentList;
