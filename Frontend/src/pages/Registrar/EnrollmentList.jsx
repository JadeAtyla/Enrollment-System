import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import RegistrarSidebar from "./RegistrarSidebar";
import { useNavigate } from "react-router-dom";
import RegistrarRegisterForm from "./RegistrarRegisterForm";

const EnrollmentList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const navigate = useNavigate();

  const [students, setStudents] = useState(
    Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      number: `202210111${index}`,
      name: `Karlos, Juan M.`,
      course: "BSCS",
      yearLevel: 3,
      section: "A",
      status: "Regular",
      enrollmentStatus: index % 2 === 0 ? "Pending" : "Not Enrolled",
    }))
  );

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle student enrollment
  const handleEnrollment = (studentId) => {
    const selectedStudent = students.find((student) => student.id === studentId);
    navigate("/registrar/enroll-student", { state: { student: selectedStudent } });
  };

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handle the opening and closing of modals
  const handleAddStudent = () => setIsAddStudentModalOpen(true);
  const closeAddStudentModal = () => setIsAddStudentModalOpen(false);


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <RegistrarSidebar
        onLogout={onLogout}
        currentPage="enrollmentList"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"} py-6`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-8 py-4 mb-6">
            <div className="relative w-full max-w-[20rem]">
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10 focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500">
                <FaSearch />
              </span>
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Year Level</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Course</option>
                <option>BSCS</option>
                <option>BSIT</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2 pr-8">
                <option>Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white shadow-lg rounded-[1.875rem] p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">Enrollment List</h1>
              <div className="flex items-center space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-green-700">
                  Export as Excel
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-indigo-700"
                  onClick={handleAddStudent}
                >
                  + Add Student
                </button>
                {/*<button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleLimitModal}
                >
                  Limit Students
                </button>*/}
              </div>
            </div>

            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b">Student Number</th>
                  <th className="px-6 py-4 border-b">Student Name</th>
                  <th className="px-6 py-4 border-b">Course</th>
                  <th className="px-6 py-4 border-b">Year Level</th>
                  <th className="px-6 py-4 border-b">Section</th>
                  <th className="px-6 py-4 border-b">Status</th>
                  <th className="px-6 py-4 border-b">Enrollment Status</th>
                  <th className="px-6 py-4 border-b">Enroll</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{student.number}</td>
                    <td className="px-6 py-4 border-b">{student.name}</td>
                    <td className="px-6 py-4 border-b">{student.course}</td>
                    <td className="px-6 py-4 border-b">{student.yearLevel}</td>
                    <td className="px-6 py-4 border-b">{student.section}</td>
                    <td className="px-6 py-4 border-b">{student.status}</td>
                    <td className="px-6 py-4 border-b">{student.enrollmentStatus}</td>
                    <td className="px-6 py-4 border-b">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 w-[150px] rounded-full hover:bg-blue-700"
                        onClick={() => handleEnrollment(student.id)}
                      >
                        Enroll Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
              </p>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAddStudentModalOpen && <RegistrarRegisterForm onClose={closeAddStudentModal} />}
       {/* {isLimitModalOpen && (
            <LimitStudentsModal
            onClose={closeLimitModal}
            onSave={(limit) => {
                console.log("New student limit:", limit);
                setIsLimitModalOpen(false);
            }}
        />
      )} */}
    </div>
  );
};

export default EnrollmentList;
