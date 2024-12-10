import React, { useState } from "react";

const DepartmentStudentsModal = ({ currentLimit, onClose, onSave }) => {
  const [limit, setLimit] = useState(currentLimit);
  const [selectedYear, setSelectedYear] = useState("");

  const handleSave = () => {
    onSave(limit);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[1.875rem] shadow-lg w-[30rem] p-8">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-2 text-center">LIMIT STUDENTS PER SECTIONS</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          You are limiting the number of students who can enroll in a section, dividing it equally across each part.
        </p>

        {/* Input Fields */}
        <div className="flex items-center gap-4 mb-6">
          {/* Year Dropdown */}
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1 text-sm">YEAR</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          {/* Limit Students Input */}
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1 text-sm">LIMIT STUDENTS</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Input Here"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStudentsModal;
