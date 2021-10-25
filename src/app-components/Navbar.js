import React from 'react';
import { connect } from 'redux-bundler-react';

import UsaceLogo from '../images/USACE_logo.png';

const Navbar = connect('selectBasemapIsDark', ({ basemapIsDark }) => {
  return (
    <button
      onClick={() => {
        window.location.replace('/');
      }}
      className="p-1 fixed top-2 left-2 flex z-10 items-center text-left"
    >
      <img
        className="w-16"
        src={UsaceLogo}
        alt="US Army Corps of Engineers Logo"
      />
      <div className="flex flex-col">
        <div
          className={`text-xl leading-none ${
            basemapIsDark ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          Access to Water
        </div>
        <div
          className={`text-xs font-mono ml-2 ${
            basemapIsDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          v2.1.0 pre-alpha
        </div>
      </div>
    </button>
  );
});

export default Navbar;
