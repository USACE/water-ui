import React from "react";
import { connect } from "redux-bundler-react";

const SearchButton = connect("doSearchOpen", ({ doSearchOpen }) => {
  return (
    <button
      className={
        "w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-200 transition duration-150 rounded-full ml-3"
      }
      onClick={(e) => {
        e.preventDefault();
        doSearchOpen();
      }}
      aria-controls='search-modal'
    >
      <span className='sr-only'>Search</span>
      <svg
        className='w-6 h-6'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='fill-current text-gray-100'
          d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z'
        />
        <path
          className='fill-current text-gray-100'
          d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z'
        />
      </svg>
    </button>
  );
});

export default SearchButton;
