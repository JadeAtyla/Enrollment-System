import React from "react";
import ComputerIcon from "../../images/404/computer.svg"; // Import your computer image

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-400 to-blue-900">
      {/* Container for text and image */}
      <div className="flex flex-row items-center">
        {/* Text Section */}
        <div className="text-center ml-20">
          {" "}
          {/* Add margin-left */}
          <h1 className="text-[170px] font-extrabold text-[#102B71] leading-none">
            Oops!
          </h1>
          <h2 className="text-[40px] font-semibold text-[#102B71] mt-3">
            404 Page not found
          </h2>
          <p className="text-[#102B71] text-[28px] mt-4">
            Lost in the enrollment queue? Let’s guide you back <br /> to home!
          </p>
          {/* Home Button */}
          <div className="mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-10 rounded-[33px] shadow-modal">
              HOME
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center w-[747px] h-[604px]">
          <img src={ComputerIcon} alt="Computer Illustration" />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
