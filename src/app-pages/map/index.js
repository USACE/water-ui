import React, { useEffect, useState } from "react";

import Header from "../../app-components/Header";

import Map from "../../app-components/Map";

import { connect } from "redux-bundler-react";
import Transition from "../../utils/Transition.js";

const durationClass = "duration-800";

const M = connect("selectModalMapIsOpen", ({ modalMapIsOpen: isOpen }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}
      <Header />
      <Transition
        className='fixed inset-0 bg-gray-800 bg-opacity-100 z-50 transition-opacity'
        show={show}
        enter={`transition ease-out ${durationClass}`}
        enterStart='opacity-0'
        enterEnd='opacity-100'
        leave={`transition ease-out ${durationClass}`}
        leaveStart='opacity-100'
        leaveEnd='opacity-0'
        aria-hidden='true'
      />
      <div className='pt-20'>
        <Map mapKey='main' />
        <MapInfoPanel />
      </div>
    </div>
  );
});

const MapInfoPanel = connect("selectLocationCount", ({ locationCount }) => {
  return (
    <div className='absolute bottom-0 left-0 right-0 max-w-sm h-16 bg-gray-800 text-white p-1 rounded-t-lg font-mono flex items-center'>
      <div className='ml-4 flex items-center'>
        <div className='text-xs pr-1'>projects</div>
        <div className='w-4 h-4 rounded-full mx-1 bg-teal-500'></div>
        <div className='text-xl border-l-2 ml-4 pl-1'>{locationCount}</div>
      </div>
    </div>
  );
});

export default M;
