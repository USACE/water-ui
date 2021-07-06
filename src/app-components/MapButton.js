import React from "react";
import { connect } from "redux-bundler-react";

const MapButton = connect(
  "selectModalMapIsOpen",
  "doModalMapOpen",
  "doModalMapClose",
  ({ modalMapIsOpen: isOpen, doModalMapOpen, doModalMapClose }) => {
    return (
      <button
        className={
          "w-10 h-10 flex items-center justify-center bg-teal-600 hover:bg-teal-200 transition duration-150 rounded-full ml-3"
        }
        onClick={(e) => {
          e.preventDefault();
          if (isOpen) {
            doModalMapClose();
            return;
          }
          doModalMapOpen();
        }}
        aria-controls='map-modal'
      >
        <span className='sr-only'>{isOpen ? "Minimize Map" : "Show Map"}</span>
        {isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-100'
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
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-100'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
            />
          </svg>
        )}
      </button>
    );
  }
);

export { MapButton };
