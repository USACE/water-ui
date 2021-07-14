import React from "react";

const SearchItem = ({ icon, name, providerName, buttons, iconColor }) => (
  <li className='hover:bg-gray-200 p-2'>
    <div className='flex w-100 space-x-4'>
      {/* Icon Full Height */}
      <div className='flex flex-col justify-center'>
        <div
          className={`flex justify-center items-center content-center w-10 h-10 rounded-full ${
            iconColor || "bg-teal-300"
          }`}
        >
          {icon || "NONE"}
        </div>
      </div>
      {/* Text */}
      <div className='flex flex-col'>
        <div className='font-normal text-medium'>{name}</div>
        <div className='uppercase font-thin opacity-50 text-xs'>
          {providerName}
        </div>
      </div>
      {/* Buttons Section */}

      {buttons && <div className='w-1/5 flex'>{buttons}</div>}
    </div>
  </li>
);

export default SearchItem;
