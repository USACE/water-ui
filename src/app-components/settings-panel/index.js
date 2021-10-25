import React from 'react';

import { Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Menu } from '@headlessui/react';

import SectionBasemap from './SectionBasemap';
import SectionLayers from './SectionLayers';

const SettingsPanel = () => {
  /* This example requires Tailwind CSS v2.0+ */

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-11 h-11 justify-center items-center rounded-2xl border border-purple-700 bg-purple-200 bg-opacity-30 text-sm font-medium text-gray-700 hover:bg-purple-400 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-indigo-500">
              <CogIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="w-72 origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              static
            >
              <div className="py-1">
                <div className="w-full max-w-md p-2 mx-auto bg-white rounded-xl">
                  <div className="space-y-1">
                    {/* Layers Section */}
                    <SectionLayers />
                    {/* Basemap Section */}
                    <SectionBasemap />
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export { SettingsPanel, SettingsPanel as default };
