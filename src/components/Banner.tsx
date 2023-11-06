import React from 'react';
import { IoStatsChartSharp } from 'react-icons/io5';

const HeroBanner = () => {
  return (
    <div className="bg-indigo-800 text-white w-[100vw] h-[250px] flex items-center justify-center">
      <div className="container mx-auto p-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold mb-4">DHIS2 Dashboard</h1>
            <p className="text-lg mb-6">Test Done by Chisom Chima chimachisom360@gmail.com</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              <a href="https://github.com/Chisomchima/dhis2-project">Visit Github</a>
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex items-center justify-end">
            {/* Add responsive classes to hide/show the logo */}
            <IoStatsChartSharp style={{ fontSize: "12rem" }} className="hidden md:block" data-testid="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
