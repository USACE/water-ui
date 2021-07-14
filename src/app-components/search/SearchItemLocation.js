import React from "react";
import SearchItem from "./SearchItem";

const IconLocation = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </svg>
);

const IconProject = () => (
  // https://github.com/nationalparkservice/symbol-library
  <svg
    className='h-6 w-6'
    version='1.1'
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='22px'
    height='22px'
    viewBox='0 0 22 22'
  >
    <rect y='6' width='7' height='1' />
    <rect y='8' width='7' height='1' />
    <rect y='10' width='7' height='1' />
    <rect y='12' width='7' height='1' />
    <rect y='14' width='7' height='1' />
    <rect y='16' width='7' height='1' />
    <rect y='18' width='7' height='1' />
    <polygon points='8,4 10,4 13,19 8,19 ' />
    <g>
      <path
        d='M22,19c-0.7,0-1.1-0.4-1.4-0.6C20.4,18.1,20.3,18,20,18s-0.4,0.1-0.6,0.4C19.1,18.6,18.7,19,18,19c-0.6,0-0.9-0.3-1.2-0.6
		C16.5,18.2,16.4,18,16,18c-0.4,0-0.5,0.1-0.7,0.3c-0.3,0.2-0.6,0.6-1.3,0.6v-1c0.3,0,0.4-0.1,0.6-0.3c0.3-0.3,0.6-0.6,1.4-0.6
		c0.8,0,1.2,0.4,1.5,0.7c0.2,0.2,0.3,0.3,0.5,0.3c0.3,0,0.4-0.1,0.6-0.4c0.3-0.3,0.6-0.6,1.4-0.6s1.1,0.4,1.4,0.6
		c0.2,0.2,0.4,0.4,0.6,0.4V19z'
      />
    </g>
    <g>
      <path
        d='M22,16c-0.7,0-1.1-0.4-1.4-0.6C20.4,15.1,20.3,15,20,15s-0.4,0.1-0.6,0.4C19.1,15.6,18.7,16,18,16c-0.6,0-0.9-0.3-1.2-0.6
		C16.5,15.2,16.4,15,16,15c-0.4,0-0.5,0.1-0.7,0.3c-0.3,0.2-0.6,0.6-1.3,0.6v-1c0.3,0,0.4-0.1,0.6-0.3c0.3-0.3,0.6-0.6,1.4-0.6
		c0.8,0,1.2,0.4,1.5,0.7c0.2,0.2,0.3,0.3,0.5,0.3c0.3,0,0.4-0.1,0.6-0.4c0.3-0.3,0.6-0.6,1.4-0.6s1.1,0.4,1.4,0.6
		c0.2,0.2,0.4,0.4,0.6,0.4V16z'
      />
    </g>
  </svg>
);
const SearchItemLocation = ({ id, public_name, kind }) => {
  const isProject = kind.toUpperCase() === "PROJECT" ? true : false;
  return (
    <SearchItem
      key={id}
      icon={isProject ? <IconProject /> : <IconLocation />}
      name={public_name}
      providerName={isProject ? "Project" : "Location"}
      buttons={<></>}
    />
  );
};

export default SearchItemLocation;
