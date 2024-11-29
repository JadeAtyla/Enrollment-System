import React from "react";

const StudentProfile = ({ user }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Student Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Student Number</label>
          <input
            type="text"
            value={user?.studentNumber || "[Student Number]"}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={user?.email || "[Email]"}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
        {/* Add more fields as required */}
      </div>
    </div>
  );
};

export default StudentProfile;
