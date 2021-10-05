import React from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/solid";
import { connect } from "redux-bundler-react";

import { classNames } from "../../utils";

const SectionLayers = connect(
  "selectLayersList",
  "doBasemapChange",
  "doLayerSettingsToggleCollapse",
  "selectLayerSettingsIsCollapsed",
  ({
    layersList,
    doBasemapChange,
    doLayerSettingsToggleCollapse,
    layerSettingsIsCollapsed: collapsed,
  }) => {
    const handleClick = (e) => {
      console.log("Clicked it!");
    };

    return (
      <Menu className='w-full'>
        {({ open }) => (
          <>
            <Menu.Button as='div'>
              <div
                tabIndex={0}
                onClick={() => {
                  doLayerSettingsToggleCollapse();
                }}
                className='focus:ring-2 focus:ring-blue-500 cursor-pointer flex justify-between px-4 py-3 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              >
                {/* Text */}
                <div>Visible Layers</div>
                {/* Icon */}
                <div>
                  <ChevronDownIcon
                    className={classNames(
                      "-mr-1 ml-2 h-5 w-5",
                      collapsed && "transform rotate-180"
                    )}
                    aria-hidden='true'
                  />
                </div>
              </div>
            </Menu.Button>
            {
              <Transition
                show={!collapsed}
                enter='transition duration-50 ease-in'
                enterFrom='transform scale-100 op      acity-0 -translate-y-8'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0 -translate-y-8'
              >
                <Menu.Items
                  className='origin-top-right focus:outline-none'
                  static
                >
                  {layersList.map((a, idx) => (
                    <Menu.Item
                      key={idx}
                      disabled={false}
                      onClick={(e) => handleClick(a)}
                    >
                      {({ active, disabled }) => (
                        <div
                          className={classNames(
                            idx === 0 && "mt-1",
                            "flex items-center ml-4 px-4 py-1 text-sm rounded-xl",
                            !disabled && "cursor-pointer",
                            disabled && "bg-yellow-100",
                            active ? "bg-yellow-50" : "text-gray-700"
                          )}
                        >
                          <div className='rounded w-8 h-8 overflow-hidden border-2 border-black' />
                          <div
                            className={classNames(
                              "ml-2 flex-grow",
                              disabled && "font-semibold"
                            )}
                          >
                            {a.name}
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
                  ))}
                </Menu.Items>
              </Transition>
            }
          </>
        )}
      </Menu>
    );
  }
);

export default SectionLayers;
