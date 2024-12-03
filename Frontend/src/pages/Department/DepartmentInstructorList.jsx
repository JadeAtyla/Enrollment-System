import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import { useNavigate } from "react-router-dom";
import InstructorInfoModal from "./InstructorInfoModal";
import DepartmentAddInstructor from "./DepartmentAddInstructor"; // Import the renamed modal component

const DepartmentInstructorList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isAddInstructorModalOpen, setIsAddInstructorModalOpen] = useState(false);
  const instructorsPerPage = 10; // or any number that suits your pagination logic

  const [instructors, setInstructors] = useState(
    Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      instructorId: `2022${index + 1}`,
      name: `Instructor ${index + 1}`,
      email: `instructor${index + 1}@university.edu`,
      contact: `091234567${index}`,
      address: `1234 Elm Street, City ${index + 1}`,
    }))
  );

  const handleRowDoubleClick = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleSaveInstructor = (updatedInstructor) => {
    setInstructors((prev) =>
      prev.map((instructor) =>
        instructor.id === updatedInstructor.id ? updatedInstructor : instructor
      )
    );
    setSelectedInstructor(null);
  };

  const handleAddInstructor = (newInstructor) => {
    setInstructors((prev) => [newInstructor, ...prev]); // Add the new instructor to the list
    setIsAddInstructorModalOpen(false); // Close modal after adding
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastInstructor = currentPage * instructorsPerPage;
  const indexOfFirstInstructor = indexOfLastInstructor - instructorsPerPage;
  const currentInstructors = instructors.slice(
    indexOfFirstInstructor,
    indexOfLastInstructor
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DepartmentSidebar
        onLogout={onLogout}
        currentPage="instructorList"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } py-6`}
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
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-full px-4 py-2">
                <option value="" disabled selected>
                  Select Year Level
                </option>
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
                <option>4th</option>
              </select>
              <select className="border border-gray-300 rounded-full px-4 py-2">
                <option value="" disabled selected>
                  Select Course
                </option>
                <option>Computer Science</option>
                <option>Information Technology</option>
              </select>
            </div>
          </div>
          {/* Instructor List */}
          <div className="bg-white shadow-lg rounded-[1.875rem] p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Instructor List
              </h1>
              <div className="flex items-center space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-green-700">
                  Export as Excel
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-indigo-700"
                  onClick={() => setIsAddInstructorModalOpen(true)} // Open modal
                >
                  + Add Instructor
                </button>
              </div>
            </div>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b">Instructor ID</th>
                  <th className="px-6 py-4 border-b">Instructor Name</th>
                  <th className="px-6 py-4 border-b">Email</th>
                  <th className="px-6 py-4 border-b">Contact No.</th>
                  <th className="px-6 py-4 border-b">Address</th>
                </tr>
              </thead>
              <tbody>
                {currentInstructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(instructor)}
                  >
                    <td className="px-6 py-4 border-b">{instructor.instructorId}</td>
                    <td className="px-6 py-4 border-b">{instructor.name}</td>
                    <td className="px-6 py-4 border-b">{instructor.email}</td>
                    <td className="px-6 py-4 border-b">{instructor.contact}</td>
                    <td className="px-6 py-4 border-b">{instructor.address}</td>
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
                Page {currentPage} of{" "}
                {Math.ceil(instructors.length / instructorsPerPage)}
              </p>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(instructors.length / instructorsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {selectedInstructor && (
        <InstructorInfoModal
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
          onSave={handleSaveInstructor}
        />
      )}
      {isAddInstructorModalOpen && (
        <DepartmentAddInstructor
          onClose={() => setIsAddInstructorModalOpen(false)}
          onSave={handleAddInstructor} // Ensure this correctly updates the instructor list
        />
      )}
    </div>
  );
};

export default DepartmentInstructorList;
