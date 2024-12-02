import React, { useState } from "react";

const DepartmentAddSchedule = ({ onClose, onSave }) => {
  const [scheduleData, setScheduleData] = useState({
    course: "",
    section: "",
    instructor: "",
    labOrLec: "",
    fromTime: "",
    day: "",
    toTime: "",
    room: "",
    yearLevel: "",
  });

  const [isSaved, setIsSaved] = useState(false); // Track if data was saved
  const [isSaving, setIsSaving] = useState(false); // Track saving state to prevent multiple saves

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (onClose) {
      onClose(); // Close the modal
    }
  };

  const handleSave = () => {
    setIsSaving(true); // Start saving

    // Simulate saving process (e.g., API call or validation)
    setTimeout(() => {
      if (onSave) {
        onSave(scheduleData); // Save the schedule data
      }
      setIsSaving(false); // Stop saving

      // Set saved state and show feedback message
      setIsSaved(true);

      // Close modal after 2 seconds (optional, you can change this)
      setTimeout(() => {
        setIsSaved(false); // Reset saved state
        if (onClose) {
          onClose(); // Close the modal
        }
      }, 2000); // Modal closes after 2 seconds
    }, 1000); // Simulated delay for saving
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleCancel} // Close modal when clicking outside
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-[52rem] py-[2rem] px-[3rem] h-[40rem] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Add Schedule</h2>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto">
          <form className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Course *</label>
              <input
                type="text"
                name="course"
                value={scheduleData.course}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Section *</label>
              <input
                type="text"
                name="section"
                value={scheduleData.section}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instructor *</label>
              <input
                type="text"
                name="instructor"
                value={scheduleData.instructor}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lab or Lec *</label>
              <input
                type="text"
                name="labOrLec"
                value={scheduleData.labOrLec}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From Time *</label>
              <input
                type="text"
                name="fromTime"
                value={scheduleData.fromTime}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Day *</label>
              <input
                type="text"
                name="day"
                value={scheduleData.day}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Time *</label>
              <input
                type="text"
                name="toTime"
                value={scheduleData.toTime}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room *</label>
              <input
                type="text"
                name="room"
                value={scheduleData.room}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year Level *</label>
              <input
                type="text"
                name="yearLevel"
                value={scheduleData.yearLevel}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Note: Ensure the schedule details are accurate before saving.
          </p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 ${isSaving ? 'bg-gray-500' : 'bg-green-600'} text-white rounded-lg hover:bg-green-700`}
              onClick={handleSave}
              disabled={isSaving} // Disable button while saving
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Success Feedback */}
        {isSaved && (
          <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 rounded-t-2xl">
            Schedule added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentAddSchedule;
