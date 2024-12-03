import React, { useState } from "react";

const InstructorInfoModal = ({ instructor, onClose, onSave }) => {
  const [updatedInstructor, setUpdatedInstructor] = useState({ ...instructor });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(updatedInstructor); // Pass updated instructor to the parent component
    }
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl shadow-lg w-[52rem] py-[2rem] px-[3rem] h-[40rem] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Edit Instructor</h2>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto">
          <form className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={updatedInstructor.lastName || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street *</label>
              <input
                type="text"
                name="street"
                value={updatedInstructor.street || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={updatedInstructor.firstName || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Barangay *</label>
              <input
                type="text"
                name="barangay"
                value={updatedInstructor.barangay || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Middle Name *</label>
              <input
                type="text"
                name="middleName"
                value={updatedInstructor.middleName || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={updatedInstructor.email || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender *</label>
              <select
                name="gender"
                value={updatedInstructor.gender || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number *</label>
              <input
                type="text"
                name="contact"
                value={updatedInstructor.contact || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={updatedInstructor.city || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Suffix</label>
              <input
                type="text"
                name="suffix"
                value={updatedInstructor.suffix || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Province *</label>
              <input
                type="text"
                name="province"
                value={updatedInstructor.province || ""}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">Note: Ensure the details are accurate before saving.</p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfoModal;
