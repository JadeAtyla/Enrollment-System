import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";

const ListOfStudents = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const studentsPerPage = 10;
  const [filters, setFilters] = useState({
    yearLevel: "",
    course: "",
    section: "",
  });
  const [unenrollModal, setUnenrollModal] = useState({
    isOpen: false,
    studentId: "",
    inputId: "",
  });

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [students, setStudents] = useState(
    Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      number: `202210111${index}`,
      name: `Karlos, Juan M.`,
      course: index % 2 === 0 ? "BSCS" : "BSIT",
      yearLevel: (index % 4) + 1,
      section: ["A", "B", "C"][index % 3],
      academicYear: "2022-2024",
      status: "Regular",
    }))
  );

  const filteredStudents = students.filter((student) => {
    return (
      (filters.yearLevel === "" || student.yearLevel.toString() === filters.yearLevel) &&
      (filters.course === "" || student.course === filters.course) &&
      (filters.section === "" || student.section === filters.section)
    );
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const openUnenrollModal = (studentId) => {
    setUnenrollModal({ isOpen: true, studentId, inputId: "" });
  };

  const closeUnenrollModal = () => {
    setUnenrollModal({ isOpen: false, studentId: "", inputId: "" });
  };

  const confirmUnenroll = () => {
    if (unenrollModal.inputId === unenrollModal.studentId) {
      setStudents((prev) => prev.filter((student) => student.number !== unenrollModal.studentId));
      closeUnenrollModal();
      alert("Student has been successfully unenrolled.");
    } else {
      alert("Student ID does not match. Please try again.");
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
              />
              <span className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500">
                <FaSearch />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <select
                name="yearLevel"
                className="border border-gray-300 rounded-full px-4 py-2 pr-8"
                onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
                value={filters.yearLevel}
              >
                <option value="">Year Level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select
                name="course"
                className="border border-gray-300 rounded-full px-4 py-2 pr-8"
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                value={filters.course}
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
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
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
                  <th className="px-6 py-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 border-b">{student.number}</td>
                    <td className="px-6 py-4 border-b">{student.name}</td>
                    <td className="px-6 py-4 border-b">{student.course}</td>
                    <td className="px-6 py-4 border-b">{student.yearLevel}</td>
                    <td className="px-6 py-4 border-b">{student.section}</td>
                    <td className="px-6 py-4 border-b">{student.academicYear}</td>
                    <td className="px-6 py-4 border-b">{student.status}</td>
                    <td className="px-6 py-4 border-b">
                      <button
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                        onClick={() => openUnenrollModal(student.number)}
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
              <p className="text-gray-700">
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
  );
};

export default ListOfStudents;
