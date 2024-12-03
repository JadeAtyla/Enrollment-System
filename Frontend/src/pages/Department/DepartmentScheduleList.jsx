import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DepartmentSidebar from "./DepartmentSidebar";
import { useNavigate } from "react-router-dom";
import ScheduleInfoModal from "./ScheduleInfoModal";  // This will handle the schedule details modal
import DepartmentAddSchedule from "./DepartmentAddSchedule"; // This will handle adding a new schedule

const DepartmentScheduleList = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const schedulesPerPage = 10; // Adjust for schedule items per page

  const [schedules, setSchedules] = useState(
    Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      courseCode: `CS${index + 1}`,
      yearSec: `2nd Year, Section ${index + 1}`,
      day: `Day ${index + 1}`,
      labTime: `8:00 AM - 10:00 AM`,
      lecTime: `10:00 AM - 12:00 PM`,
      room: `Room ${index + 1}`,
      program: index % 2 === 0 ? "Computer Science" : "Information Technology",
      instructor: `Instructor ${index + 1}`,
    }))
  );

  const handleRowDoubleClick = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleSaveSchedule = (updatedSchedule) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
    setSelectedSchedule(null);
  };

  const handleAddSchedule = (newSchedule) => {
    setSchedules((prev) => [newSchedule, ...prev]); // Add new schedule to the list
    setIsAddScheduleModalOpen(false); // Close modal after adding
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastSchedule = currentPage * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
  const currentSchedules = schedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DepartmentSidebar
        onLogout={onLogout}
        currentPage="scheduleList"
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
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-full px-4 py-2">
                <option value="" disabled selected>
                  Select Program
                </option>
                <option>Computer Science</option>
                <option>Information Technology</option>
              </select>
            </div>
          </div>

          {/* Schedule List */}
          <div className="bg-white shadow-lg rounded-[1.875rem] p-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Schedule List
              </h1>
              <div className="flex items-center space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-green-700">
                  Export as Excel
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-indigo-700"
                  onClick={() => setIsAddScheduleModalOpen(true)} // Open modal to add schedule
                >
                  + Add Schedule
                </button>
              </div>
            </div>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b">Course Code</th>
                  <th className="px-6 py-4 border-b">Yr & Sec.</th>
                  <th className="px-6 py-4 border-b">Day</th>
                  <th className="px-6 py-4 border-b">Lab Time</th>
                  <th className="px-6 py-4 border-b">Lec Time</th>
                  <th className="px-6 py-4 border-b">Room</th>
                  <th className="px-6 py-4 border-b">Program</th>
                  <th className="px-6 py-4 border-b">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onDoubleClick={() => handleRowDoubleClick(schedule)}
                  >
                    <td className="px-6 py-4 border-b">{schedule.courseCode}</td>
                    <td className="px-6 py-4 border-b">{schedule.yearSec}</td>
                    <td className="px-6 py-4 border-b">{schedule.day}</td>
                    <td className="px-6 py-4 border-b">{schedule.labTime}</td>
                    <td className="px-6 py-4 border-b">{schedule.lecTime}</td>
                    <td className="px-6 py-4 border-b">{schedule.room}</td>
                    <td className="px-6 py-4 border-b">{schedule.program}</td>
                    <td className="px-6 py-4 border-b">{schedule.instructor}</td>
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
                {Math.ceil(schedules.length / schedulesPerPage)}
              </p>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(schedules.length / schedulesPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedSchedule && (
        <ScheduleInfoModal
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          onSave={handleSaveSchedule}
        />
      )}
      {isAddScheduleModalOpen && (
        <DepartmentAddSchedule
          onClose={() => setIsAddScheduleModalOpen(false)}
          onSave={handleAddSchedule} // Ensure this correctly updates the schedule list
        />
      )}
    </div>
  );
};

export default DepartmentScheduleList;
