import React, { useState, useEffect } from "react";
import useData from "../../components/DataUtil";
import Alert, { triggerAlert } from "../../components/Alert";

const LimitStudentsModal = ({ currentLimit, onClose, onSave }) => {
  const [limit, setLimit] = useState(currentLimit);
  const [selectedProgram, setSelectedProgram] = useState(""); // State for program selection
  const [selectedYear, setSelectedYear] = useState(""); // State for year selection
  const [selectedID, setSelectedID] = useState(null); // Store the ID of the section being updated

  const apiURL = `/api/sectioning/`;
  const { data, error, getData, updateData } = useData(apiURL);
  const [sectioning, setSectioning] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    // Fetch section data on component mount
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData]);

  useEffect(() => {
    if (data) {
      setSectioning(data);
    } else if (error) {
      console.error("Error fetching sectioning data:", error.response || error);
    }
  }, [data, error]);

  const handleSave = async () => {
    if (!selectedID) {
      console.error("No section selected to update");
      return;
    }
  
    const updatedData = { limit_per_section: limit };
  
    try {
      // Call the `updateData` method with the `id` and `updatedData`
      await updateData(selectedID, updatedData);
      onSave(limit); // Notify parent component of save success
      setTrigger(true);
      console.log(trigger)
    } catch (err) {
      setTrigger(false);
      console.error("Error updating section limit:", error.response || error);
    }
  }; 

  useEffect(()=>{
    if(trigger && data) triggerAlert("success", "Success", "Student added successfully");
    if(error) triggerAlert("error", "Error", error?.message|| error?.detail || "An error occurred");
  }, [trigger]);

  const handleProgramChange = (programId) => {
    setSelectedProgram(programId);
    setSelectedYear(""); // Reset year selection when the program changes
    setSelectedID(null); // Reset selected ID
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);

    // Find the section ID based on selected program and year
    const section = sectioning.find(
      (item) => item.program.id === selectedProgram && item.year_level.toString() === year
    );
    if (section) setSelectedID(section.id);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[1.875rem] shadow-lg w-[30rem] p-8">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          LIMIT STUDENTS PER SECTIONS
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          You are limiting the number of students who can enroll in a section,
          dividing it equally across each part.
        </p>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Program Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">PROGRAM</label>
            <select
              value={selectedProgram}
              onChange={(e) => handleProgramChange(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Program
              </option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">YEAR</label>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              disabled={!selectedProgram} // Disable if no program selected
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>
          </div>

          {/* Limit Students Input */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              LIMIT STUDENTS
            </label>
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

export default LimitStudentsModal;