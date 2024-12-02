import React, { useState } from "react";

const LimitStudentsModal = ({ currentLimit, onClose, onSave }) => {
  const [limit, setLimit] = useState(currentLimit);

  const handleSave = () => {
    onSave(limit);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[30rem] p-6">
        <h2 className="text-lg font-bold mb-4">Limit Students Per Section</h2>
        <p className="text-sm text-gray-600 mb-4">
          You are limiting the number of students who can enroll in a section,
          dividing it equally across each part.
        </p>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded-lg w-full p-2 mb-4"
          placeholder="Enter limit"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitStudentsModal;
