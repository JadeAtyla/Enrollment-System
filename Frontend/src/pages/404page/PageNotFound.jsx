import React from "react";
import ComputerIcon from "../../images/404/computer.svg"; // Import your computer image

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-400 to-blue-900 p-4">
      {/* Container for text and image */}
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left">
        {/* Text Section */}
        <div className="text-center lg:mt-28 md:ml-20 mt-8 md:mt-5">
          {" "}
          {/* Add margin-left */}
          <h1 className="text-5xl md:text-[170px] font-extrabold text-[#102B71] leading-none">
            Oops!
          </h1>
          <h2 className="text-2xl lg:mt-10 md:text-[40px] font-semibold text-[#102B71] mt-4 md:mt-3">
            404 Page not found
          </h2>
          <p className="text-lg md:text-[28px] text-[#102B71] mt-4">
            Lost in the enrollment queue? Let’s guide you back <br /> to home!
          </p>
          {/* Home Button */}
          <div className="mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 md:px-10 rounded-full shadow-modal">
              HOME
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center lg:w-[747px] lg:h-[604px] w-64 h-48 ">
          <img src={ComputerIcon} alt="Computer Illustration" />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
