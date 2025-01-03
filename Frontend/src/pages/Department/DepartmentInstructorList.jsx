import React, { useState, useLayoutEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import InstructorInfoModal from "./InformationModal";
import DepartmentAddInstructor from "./DepartmentAddInstructor";
import { useNavigate } from "react-router-dom";

const DepartmentInstructorList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isAddInstructorModalOpen, setIsAddInstructorModalOpen] =
    useState(false);
  const instructorsPerPage = 10;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set the initial state of instructors to an empty array
  const [instructors, setInstructors] = useState([]);

  const handleRowDoubleClick = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleAddInstructor = (newInstructor) => {
    const instructorName = `${newInstructor.lastName}, ${newInstructor.firstName} ${newInstructor.middleName}`;
    const newId = instructors.length + 1;

    setInstructors((prev) => [
      {
        id: newId,
        instructorId: `2022${newId}`,
        name: instructorName,
        email: newInstructor.email || "N/A",
        contact: newInstructor.contactNumber || "N/A",
        address: `${newInstructor.street}, ${newInstructor.barangay}, ${newInstructor.city}, ${newInstructor.province}`,
      },
      ...prev,
    ]);
    setIsAddInstructorModalOpen(false);
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
        currentPage="departmentInstructorList"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onNavigate={(section) => {
          switch (section) {
            case "logout":
              navigate("/department");
              break;
            case "enroll":
              navigate("/departmentInstructorList/enroll");
              break;
            case "list":
              navigate("/departmentInstructorList/list");
              break;
            case "account":
              navigate("/departmentInstructorList/account");
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
            ? currentInstructors.length > 0
              ? "ml-[18rem]" // Apply a smaller margin on mobile if instructors are listed
              : "ml-[6rem]" // Default margin when no instructors are listed
            : "ml-[15.625rem] md:ml-[19rem] lg:ml-[0rem]" // Adjusted margin for expanded sidebar (desktop/tablet)
        } py-[2rem] px-[1rem] md:px-[2rem] lg:px-[4rem] ${
          currentInstructors.length > 0 ? "max-w-[70rem]" : "max-w-[87.5rem]"
        }`}
      >
        {" "}
        {/* Add dynamic class based on instructor list size */}
        <div className="w-full max-w-[87.5rem] px-4 sm:px-6">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-4 sm:px-6 py-4 mb-4 sm:mb-6 gap-4">
            {/* Search Bar and Filters in Mobile View */}
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full items-center gap-4 md:justify-between">
              {/* Search Bar */}
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

              {/* Filters */}
              <div className="flex flex-wrap sm:flex-nowrap md:flex-nowrap flex-col md:flex-row items-center gap-4 sm:gap-4 md:ml-auto">
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

          {/* Instructor List */}
          <div className="bg-white shadow-lg rounded-[1.875rem] p-4 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
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

            {/* Scrollable Table Wrapper */}
            <div className="overflow-x-auto md:overflow-x-hidden">
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
                  {currentInstructors.length > 0 ? (
                    currentInstructors.map((instructor) => (
                      <tr
                        key={instructor.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onDoubleClick={() => handleRowDoubleClick(instructor)}
                      >
                        <td className="px-6 py-4 border-b">
                          {instructor.instructorId}
                        </td>
                        <td className="px-6 py-4 border-b">
                          {instructor.name}
                        </td>
                        <td className="px-6 py-4 border-b">
                          {instructor.email}
                        </td>
                        <td className="px-6 py-4 border-b">
                          {instructor.contact}
                        </td>
                        <td className="px-6 py-4 border-b">
                          {instructor.address}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-gray-500 italic text-center"
                      >
                        No instructors added yet.
                      </td>
                    </tr>
                  )}
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
          onSave={(updatedInstructor) => {
            const updatedList = instructors.map((inst) =>
              inst.id === updatedInstructor.id ? updatedInstructor : inst
            );
            setInstructors(updatedList);
          }}
        />
      )}
      {isAddInstructorModalOpen && (
        <DepartmentAddInstructor
          onClose={() => setIsAddInstructorModalOpen(false)}
          onSave={handleAddInstructor}
        />
      )}
    </div>
  );
};
export default DepartmentInstructorList;
