import React, { useState } from "react";

const InstructorInfoModal = ({ instructor, onClose, onSave }) => {
  const [updatedInstructor, setUpdatedInstructor] = useState({ ...instructor });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedInstructor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[40rem] py-8 px-6">
        <h2 className="text-xl font-semibold mb-4">Edit Instructor</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Instructor ID
            </label>
            <input
              type="text"
              name="instructorId"
              value={updatedInstructor.instructorId || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={updatedInstructor.name || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={updatedInstructor.email || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact No.
            </label>
            <input
              type="text"
              name="contact"
              value={updatedInstructor.contact || ""}
              onChange={handleChange}
              className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={updatedInstructor.address || ""}
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

export default InstructorInfoModal;
