import React, { useState } from "react";

const DepartmentAddStudent = ({ studentData, onClose, onSave }) => {
  const [updatedStudent, setUpdatedStudent] = useState({ ...studentData });
  const [activeTab, setActiveTab] = useState("studentInfo"); // State to track active tab

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedStudent);
    onClose();
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[50rem] py-8 px-10">
        <div className="flex justify-between mb-6">
          {/* Toggleable Headers */}
          <h2
            className={`text-xl font-semibold border-b-2 pb-1 cursor-pointer ${
              activeTab === "studentInfo"
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => toggleTab("studentInfo")}
          >
            STUDENT INFO
          </h2>
          <h2
            className={`text-xl font-semibold border-b-2 pb-1 cursor-pointer ${
              activeTab === "personalData"
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => toggleTab("personalData")}
          >
            PERSONAL DATA
          </h2>
        </div>

        {/* Conditional Rendering of Content Based on Active Tab */}
        {activeTab === "studentInfo" && (
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Student Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentNumber"
                  value={updatedStudent.studentNumber || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={updatedStudent.email || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={updatedStudent.status || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={updatedStudent.contactNumber || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course"
                  value={updatedStudent.course || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Year Level <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="yearLevel"
                  value={updatedStudent.yearLevel || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Section <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="section"
                  value={updatedStudent.section || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "personalData" && (
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedStudent.lastName || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={updatedStudent.street || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Middle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={updatedStudent.middleName || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Suffix</label>
                <input
                  type="text"
                  name="suffix"
                  value={updatedStudent.suffix || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={updatedStudent.gender || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedStudent.firstName || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Barangay <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="barangay"
                  value={updatedStudent.barangay || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={updatedStudent.city || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="province"
                  value={updatedStudent.province || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={updatedStudent.dateOfBirth || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Contact No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={updatedStudent.contactNo || ""}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-6">
          Note: Saving this changes your data in the database.
        </p>

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
            onClick={onClose}
          >
            Back
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

export default DepartmentAddStudent;
