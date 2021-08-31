import React from "react";
import { connect } from "redux-bundler-react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// Inspired by dropdown component from https://tailwindui.com/preview
const BasemapSwitcher = connect(
  "selectBasemapActiveIdx",
  "selectBasemapList",
  "doBasemapChange",
  ({ basemapActiveIdx, basemapList, doBasemapChange }) => {
    const handleClick = (e, idx) => {
      if (basemapActiveIdx === idx) {
        // No Action Needed
        return;
      }
      doBasemapChange(idx);
    };

    return (
      //   <Menu as='div' className='relative inline-block text-left'>
      <Menu as='div' className='absolute right-2 top-2 text-left'>
        {({ open }) => (
          <>
            <Menu.Button className='rounded-full inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
              {basemapList[basemapActiveIdx] &&
                basemapList[basemapActiveIdx].name}
              <ChevronDownIcon
                className='-mr-1 ml-2 h-5 w-5'
                aria-hidden='true'
              />
            </Menu.Button>
            {
              <Transition
                as={Fragment}
                show={true}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  static
                >
                  {basemapList.map((b, idx) => {
                    return (
                      <Menu.Item
                        disabled={idx === basemapActiveIdx}
                        onClick={(e) => handleClick(e, idx)}
                      >
                        {({ active, disabled }) => (
                          <div
                            className={classNames(
                              "flex items-center px-4 py-2 text-sm",
                              !disabled && "cursor-pointer",
                              disabled && "bg-gray-200",
                              active
                                ? "bg-blue-300 text-gray-900"
                                : "text-gray-700"
                            )}
                          >
                            <img
                              className='rounded w-8 h-8 overflow-hidden border-2 border-black'
                              src={b.thumbnail}
                              alt={`Thumbnail example of ${b.name} background layer`}
                            />
                            <div
                              className={classNames(
                                "ml-2 flex-grow",
                                disabled && "font-semibold"
                              )}
                            >
                              {b.name}
                            </div>
                            {disabled ? (
                              <CheckIcon
                                className='mx-2 h-5 w-5'
                                aria-hidden='true'
                              />
                            ) : (
                              <div className='mx-2 h-5 w-5' />
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </Transition>
            }
          </>
        )}
      </Menu>
    );
  }
);

export default BasemapSwitcher;
