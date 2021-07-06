import React, { useState } from "react";
import Map from "../../app-components/Map";

const HappeningNow = ({ getRef }) => {
  const [tab, setTab] = useState(1);

  const Tabs = (props) => {
    return (
      <div className='mb-8 md:mb-0'>
        <div
          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
            tab !== 1
              ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
              : "bg-gray-200 border-transparent"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setTab(1);
          }}
        >
          <div>
            <div className='font-bold leading-snug tracking-tight mb-1'>
              Big Water Basin
            </div>
            <div className='text-gray-600'>
              2.5 Inches of Rain in Past 24 Hours
            </div>
          </div>
          <div className='flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3'>
            <svg
              className='w-3 h-3 fill-current'
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z' />
            </svg>
          </div>
        </div>
        <div
          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
            tab !== 2
              ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
              : "bg-gray-200 border-transparent"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setTab(2);
          }}
        >
          <div>
            <div className='font-bold leading-snug tracking-tight mb-1'>
              Blue Water Dam
            </div>
            <div className='text-gray-600'>
              Flood Conditions - Less than 1% of Flood Storage Remaining
            </div>
          </div>
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
        </div>
        <div
          className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
            tab !== 3
              ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
              : "bg-gray-200 border-transparent"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setTab(3);
          }}
        >
          <div>
            <div className='font-bold leading-snug tracking-tight mb-1'>
              Baldhill Dam
            </div>
            <div className='text-gray-600'>
              Lake level 10 feet below normal for this time of year
            </div>
          </div>
          <div className='flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3'>
            <svg
              className='w-3 h-3 fill-current'
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z'
                fill='#191919'
                fillRule='nonzero'
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className='relative bg-gray-100 pb-20'>
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className='absolute inset-0 pointer-events-none mb-16'
        aria-hidden='true'
      ></div>
      <div
        ref={getRef()}
        className='absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2'
      ></div>

      <div className='relative max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='pt-12 md:pt-20'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
            <h1 className='h2 mb-4'>Happening Now</h1>
            <p className='text-xl text-gray-600'>Across the Country</p>
          </div>
          {/* Section content */}
          <div className='md:flex flex-row-reverse md:justify-between'>
            {/* Events */}

            <div className='w-full mb-8 md:mb-0 md:w-1/2'>
              <Map mapKey='happeningMap' height={360} />
            </div>
            <div className='md:w-5/12' data-aos='fade-right'>
              {/* Tabs buttons */}
              <Tabs />
            </div>

            {/* Tabs items */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HappeningNow;
