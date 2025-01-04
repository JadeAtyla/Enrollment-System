import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";
import useData from "../../components/DataUtil";

const ListOfStudents = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page in pagination
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State for sidebar visibility
  const studentsPerPage = 10; // Number of students per page in pagination
  const [filters, setFilters] = useState({
    year_level: "",
    program: "",
    section: "",
    search: "",
  }); // Filters for student search
  const [unenrollModal, setUnenrollModal] = useState({
    isOpen: false,
    studentId: "",
    inputId: "",
  }); // Modal for unenrolling student

  const navigate = useNavigate(); // Navigate hook for page redirection

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Function to change page
  // Custom hook to fetch data from the API
  const { data, error, getData, updateData } = useData(`/api/student/?enrollment_status=ENROLLED`);
  const [students, setStudents] = useState([]); // State for storing students data

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData(); // Fetch student data on component mount
  }, [getData]);

  useEffect(() => {
    if (data) {
      setStudents(data); // Update students state if data is fetched
    } else if (error) {
      console.error(error?.error); // Log error if fetching fails
    }
  }, [data, error, updateData]);

  // Filter students based on selected filters
  const filteredStudents = students?.filter((student) => {
    const matchesYearLevel =
      !filters.year_level || student?.year_level?.toString() === filters.year_level;
    const matchesProgram =
      !filters.program || student?.program?.toLowerCase() === filters.program.toLowerCase();
    const matchesSection =
      !filters.section || student?.section?.toLowerCase() === filters.section.toLowerCase();
    const matchesSearch =
      !filters.search ||
      student?.first_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      student?.last_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      student?.id?.toString().includes(filters.search);

    return matchesYearLevel && matchesProgram && matchesSection && matchesSearch;
  }) || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  useEffect(() => {
    console.log(unenrollModal.studentId, unenrollModal.inputId);
  }, [unenrollModal]);

  const openUnenrollModal = (studentId) => {
    setUnenrollModal({ isOpen: true, studentId, inputId: "" });
  };

  const closeUnenrollModal = () => {
    setUnenrollModal({ isOpen: false, studentId: "", inputId: "" });
  };

  // Confirm unenrollment
  const confirmUnenroll = async () => {
    if (unenrollModal.inputId === unenrollModal.studentId.toString()) {
      try {
        const payload = { enrollment_status: "NOT_ENROLLED" };
        await updateData(unenrollModal.studentId, payload); // Use updateData from useData to unenroll
        console.log(`Student with ID ${unenrollModal.studentId} has been unenrolled.`);

        window.location.reload();
        closeUnenrollModal();
      } catch (error) {
        console.error("Failed to unenroll the student:", error);
      }
    } else {
      console.log("Student ID does not match. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="list"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onNavigate={(section) => {
          if (section === "logout") {
            navigate("/registrar");
          } else if (section === "dashboard") {
            navigate("/registrar/dashboard");
          } else if (section === "enroll") {
            navigate("/registrar/enroll");
          }
        }}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } py-6`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center bg-white shadow rounded-[1.875rem] px-8 py-4 mb-6">
            <div className="relative w-[20rem]">
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10 focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
              <span className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500">
                <FaSearch />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <select
                name="year_level"
                className="border border-gray-300 rounded-full px-4 py-2 pr-8"
                onChange={(e) => setFilters({ ...filters, year_level: e.target.value })}
                value={filters.year_level}
              >
                <option value="">Year Level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select
                name="program"
                className="border border-gray-300 rounded-full px-4 py-2 pr-8"
                onChange={(e) => setFilters({ ...filters, program: e.target.value })}
                value={filters.program}
              >
                <option value="">Course</option>
                <option value="BSCS">BSCS</option>
                <option value="BSIT">BSIT</option>
              </select>
              <select
                name="section"
                className="border border-gray-300 rounded-full px-4 py-2 pr-8"
                onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                value={filters.section}
              >
                <option value="">Section</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          {/* Enrolled Students Table */}
          <div className="bg-white shadow rounded-[1.875rem] p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[1.875rem] font-semibold text-gray-800">Enrolled Students</h1>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Export as Excel
              </button>
            </div>

            {/* Table */}
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-4 border-b">Student Number</th>
                  <th className="px-6 py-4 border-b">Student Name</th>
                  <th className="px-6 py-4 border-b">Course</th>
                  <th className="px-6 py-4 border-b">Year Level</th>
                  <th className="px-6 py-4 border-b">Section</th>
                  <th className="px-6 py-4 border-b">Academic Year</th>
                  <th className="px-6 py-4 border-b">Status</th>
                  <th className="px-6 py-4 border-b">Enrollment Status</th>
                  <th className="px-6 py-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student?.id} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 border-b">{student?.id}</td>
                    <td className="px-6 py-4 border-b">{student?.last_name}, {student?.first_name} {student?.middle_name}</td>
                    <td className="px-6 py-4 border-b">{student?.program}</td>
                    <td className="px-6 py-4 border-b">{student?.year_level}</td>
                    <td className="px-6 py-4 border-b">{student?.section}</td>
                    <td className="px-6 py-4 border-b">{student?.academic_year}</td>
                    <td className="px-6 py-4 border-b">{student?.status}</td>
                    <td className="px-6 py-4 border-b">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {student?.enrollment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <button
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                        onClick={() => openUnenrollModal(student?.id)}
                      >
                        Unenroll Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {Math.ceil(filteredStudents.length / studentsPerPage)}
              </p>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredStudents.length / studentsPerPage)}
              >
                Next
              </button>
            </div>
          </div>

          {/* Unenroll Modal */}
        {unenrollModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-[1.875rem] p-8 w-[30rem] shadow-lg">
              <h2 className="text-[1.5rem] font-bold mb-4 text-gray-800">Confirm Unenroll</h2>
              <p className="text-gray-600 mb-4">
                Enter{" "}
                <strong className="text-red-600">{unenrollModal.studentId}</strong> to confirm
                unenrollment.
              </p>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
                placeholder="Enter Student ID"
                value={unenrollModal.inputId}
                onChange={(e) => setUnenrollModal({ ...unenrollModal, inputId: e.target.value })}
              />
              <div className="flex justify-end gap-4 mb-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={closeUnenrollModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={confirmUnenroll}
                >
                  Confirm
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Note: This action is irreversible and will remove the student from the list.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default ListOfStudents;
