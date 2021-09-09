import React from "react";

import UsaceLogo from "../images/USACE_logo.png";

const Navbar = () => {
  return (
    <button
      onClick={() => {
        window.location.replace("/");
      }}
      className='p-1 fixed top-2 left-2 flex z-10 items-center text-left'
    >
      <img
        className='w-16'
        src={UsaceLogo}
        alt='US Army Corps of Engineers Logo'
      />
      <div className='flex flex-col'>
        <div className='text-xl leading-none'>Access to Water</div>
        <div className='text-xs font-mono ml-2 text-gray-500'>
          v2.0.0 pre-alpha
        </div>
      </div>
    </button>
  );
};

export default Navbar;
