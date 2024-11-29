import React from "react";

const Checklist = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Checklist of Courses</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header Information */}
        <div className="grid grid-cols-2 mb-4">
          <p><strong>Name:</strong> [Name]</p>
          <p><strong>Student Number:</strong> [20####]</p>
          <p><strong>Address:</strong> [Address]</p>
        </div>

        {/* Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2 text-left">Course Code</th>
              <th className="border p-2 text-left">Course Title</th>
              <th className="border p-2 text-left">Grade</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">COSC 090</td>
              <td className="border p-2">Sample Course</td>
              <td className="border p-2">Passed</td>
              <td className="border p-2 text-green-500">✓ Passed</td>
            </tr>
          </tbody>
        </table>
        {/* Export Button */}
        <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Checklist;
