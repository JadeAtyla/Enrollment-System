import React from "react";

const COR = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Certificate of Registration</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* COR Header */}
        <h2 className="text-center font-bold text-lg mb-4">Cavite State University - Bacoor</h2>
        <p className="text-center mb-6">Registration Form</p>

        {/* Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2 text-left">Course Code</th>
              <th className="border p-2 text-left">Course Title</th>
              <th className="border p-2 text-left">Units</th>
              <th className="border p-2 text-left">Schedule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">COSC 101</td>
              <td className="border p-2">Introduction to Programming</td>
              <td className="border p-2">3</td>
              <td className="border p-2">Mon/Wed 9:00-10:30</td>
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

export default COR;
