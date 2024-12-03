import React, { useState } from "react";

const DepartmentAddInstructor = ({ onClose, onSave }) => {
  const [instructorData, setInstructorData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    gender: "",
    email: "",
    contactNumber: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
  });

  const [isSaved, setIsSaved] = useState(false); // New state to track if data was saved
  const [isSaving, setIsSaving] = useState(false); // Track saving state to prevent multiple saves

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorData((prev) => ({
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
        onSave(instructorData); // Save the instructor data
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
          <h2 className="text-lg font-semibold text-gray-700">
            Add Instructor
          </h2>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto">
          <form className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={instructorData.lastName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={instructorData.firstName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Middle Name *
              </label>
              <input
                type="text"
                name="middleName"
                value={instructorData.middleName}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Suffix (Optional)
              </label>
              <input
                type="text"
                name="suffix"
                value={instructorData.suffix}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender *</label>
              <select
                name="gender"
                value={instructorData.gender}
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
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={instructorData.email}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number *
              </label>
              <input
                type="text"
                name="contactNumber"
                value={instructorData.contactNumber}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street *</label>
              <input
                type="text"
                name="street"
                value={instructorData.street}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Barangay *
              </label>
              <input
                type="text"
                name="barangay"
                value={instructorData.barangay}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={instructorData.city}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Province *
              </label>
              <input
                type="text"
                name="province"
                value={instructorData.province}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Note: Ensure the details are accurate before saving.
          </p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 ${
                isSaving ? "bg-gray-500" : "bg-green-600"
              } text-white rounded-lg hover:bg-green-700`}
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
            Instructor added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentAddInstructor;
