import React, { useRef } from "react";

import { Transition } from "@headlessui/react";
import { CogIcon, XIcon } from "@heroicons/react/outline";
import { connect } from "redux-bundler-react";

import useClickOutside from "../../hooks/useClickOutside";

import SectionBasemap from "./SectionBasemap";

const SettingsPanelButton = connect(
  "doSettingsPanelToggleOpen",
  "selectSettingsPanelIsOpen",
  ({ doSettingsPanelToggleOpen, settingsPanelIsOpen: isOpen }) => {
    return (
      <Transition
        show={!isOpen}
        enter='transition ease-out duration-75'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <button
          tabIndex={0}
          className={`focus:ring-2 focus:ring-purple-600 focus:border-transparent border-2 border-purple-700 flex justify-center items-center bg-white hover:bg-purple-300 p-2 cursor-pointer w-11 h-11 rounded-xl ${
            isOpen && "hidden"
          }`}
          onClick={(e) => {
            doSettingsPanelToggleOpen();
          }}
        >
          <CogIcon className='w-12 h-12 text-purple-800' />
        </button>
      </Transition>
    );
  }
);

// Started w/ copy from example code: https://headlessui.dev/react/disclosure
const SettingsPanelContent = connect(
  "selectSettingsPanelIsOpen",
  "doSettingsPanelClose",
  ({ settingsPanelIsOpen: isOpen, doSettingsPanelClose }) => {
    const ref = useRef();

    useClickOutside(ref, () => {
      doSettingsPanelClose();
    });

    // @todo; Handle escape keydown event; call doSettingsPanelClose();

    return (
      <Transition
        show={isOpen}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <div
          ref={ref}
          className='w-full max-w-md p-2 mx-auto bg-white rounded-xl border-2 border-purple-900'
        >
          {/* Settings Title */}
          <div className='flex h-12 justify-between w-full px-4 py-2 font-light text-left text-purple-900 border-b-2 border-purple-800 mb-4'>
            <div className='font-mono'>Settings</div>
            <button
              onClick={(e) => {
                doSettingsPanelClose();
              }}
              className='flex flex-col justify-center cursor-pointer'
            >
              <XIcon className='-mr-2 h-7 w-7' aria-hidden='true' />
            </button>
          </div>
          {/* Basemap Section */}
          <SectionBasemap />
        </div>
      </Transition>
    );
  }
);

const SettingsPanel = () => {
  return (
    <div className='items-end'>
      <div className='absolute top-2 right-2'>
        <SettingsPanelButton />
      </div>
      <div className='top-2 right-2 absolute w-72'>
        <SettingsPanelContent />
      </div>
    </div>
  );
};

export { SettingsPanel, SettingsPanel as default };
