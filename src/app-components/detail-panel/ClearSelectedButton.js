import React from "react";
import { connect } from "redux-bundler-react";

const ClearSelectedButton = connect(
  "doSelectedClear",
  ({ doSelectedClear }) => (
    <div
      onClick={() => {
        doSelectedClear();
      }}
      className='flex justify-center w-6 h-6 rounded-full bg-gray-100 opacity-80 cursor-pointer'
    >
      <div className='flex flex-col justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-black'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
    </div>
  )
);

export default ClearSelectedButton;
