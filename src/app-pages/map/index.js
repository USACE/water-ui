import React, { useEffect, useState } from "react";
import { connect } from "redux-bundler-react";

// import Header from "../../app-components/Header";
import Map from "../../app-components/Map";
import DetailPanel from "./detail-panel";

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
      {/* <Header /> */}
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
        <DetailPanel />
      </div>
    </div>
  );
});

export default M;
