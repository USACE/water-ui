import React from "react";

const ListItem = ({ name, symbol, description, href }) => {
  return (
    <a
      className={`flex mx-2 items-center justify-between text-lg p-4 rounded border mb-3 bg-white border-gray-200 hover:shadow-lg`}
      href={href}
    >
      {/* Item 1 */}
      <div className=''>
        <div className='font-bold leading-snug tracking-tight mb-1'>{name}</div>
        <div className='text-gray-600'>{description}</div>
      </div>
      {/* Item 2 */}
      <div className='flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3'>
        <svg
          className='w-3 h-3 fill-current'
          viewBox='0 0 12 12'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z'
            fillRule='nonzero'
          />
        </svg>
      </div>
    </a>
  );
};

export default ListItem;
