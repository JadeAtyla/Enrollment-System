import React, { useState } from "react";

const DepartmentAddCourse = ({ onClose, onSave }) => {
  const [courseDetails, setCourseDetails] = useState({
    course: "",
    year: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(courseDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[30rem] p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD COURSE</h2>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              name="course"
              value={courseDetails.course}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select
                name="year"
                value={courseDetails.year}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Section</label>
              <input
                type="text"
                name="section"
                placeholder="Input Here"
                value={courseDetails.section}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAddCourse;
