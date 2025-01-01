import React, { useState, useEffect } from "react";
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
  const [isAddInstructorModalOpen, setIsAddInstructorModalOpen] = useState(false);
  const instructorsPerPage = 10;
  const navigate = useNavigate();

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
        <div className="w-full max-w-[87.5rem] px-4 sm:px-6">
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
