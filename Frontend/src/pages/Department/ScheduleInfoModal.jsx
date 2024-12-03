import React, { useState } from "react";

const ScheduleInfoModal = ({ schedule, onClose, onSave }) => {
  const [updatedSchedule, setUpdatedSchedule] = useState({ ...schedule });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedSchedule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[40rem] py-8 px-6">
        <h2 className="text-xl font-semibold mb-4">Edit Schedule</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Code
            </label>
            <input
              type="text"
              name="courseCode"
              value={updatedSchedule.courseCode || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Year & Section
            </label>
            <input
              type="text"
              name="yearSec"
              value={updatedSchedule.yearSec || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Day</label>
            <input
              type="text"
              name="day"
              value={updatedSchedule.day || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lab Time</label>
            <input
              type="text"
              name="labTime"
              value={updatedSchedule.labTime || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lec Time</label>
            <input
              type="text"
              name="lecTime"
              value={updatedSchedule.lecTime || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <input
              type="text"
              name="room"
              value={updatedSchedule.room || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Program</label>
            <input
              type="text"
              name="program"
              value={updatedSchedule.program || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={updatedSchedule.instructor || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500 mt-6">
          Note: Saving this changes your data in the database.
        </p>

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInfoModal;
