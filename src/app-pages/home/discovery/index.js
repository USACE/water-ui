import React, { useState, useRef, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Transition from "../../../utils/Transition.js";
import OfficeList from "./OfficeList";
import StateList from "./StateList";
import WatershedList from "./WatershedList";
import { Scrollbars } from "react-custom-scrollbars-2";

import OfficeBarGraph from "./OfficeBarGraph";
import StateBarGraph from "./StateBarGraph";

import { ToggleSwitchAllLocations } from "../../../app-components/ToggleSwitch.js";

const tabData = {
  state: {
    name: "By State or Territory",
    description: "Alabama, Alaska, Arkansas...",
    icon: (
      <svg
        className='w-3 h-3 fill-current'
        viewBox='0 0 12 12'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z' />
      </svg>
    ),
  },
  watershed: {
    name: "By Watershed",
    description:
      "A watershed is an area of land that drains all the streams and rainfall to a common outlet",
    icon: (
      <svg
        className='w-3 h-3 fill-current'
        viewBox='0 0 12 12'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z' />
      </svg>
    ),
  },
  office: {
    name: "By Corps Office",
    description:
      "The Corps of Engineers consists of 30+ offices working together to accomplish the water management mission",
    icon: (
      <svg
        className='w-3 h-3 fill-current'
        viewBox='0 0 12 12'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z' />
      </svg>
    ),
  },
};

const Discovery = connect(
  "doSearchOpen",
  "selectHash",
  "doUpdateHash",
  ({ doSearchOpen, hash, doUpdateHash, getRef }) => {
    const [tab, setTab] = useState((hash && tabData[hash]) || null);
    const tabs = useRef(null);

    // If no hash on URL and tab is active, clear tab;
    // useEffect(() => {
    //   if (hash === "" && tab) {
    //     setTab(null);
    //     return;
    //   }
    // }, [hash, tab]);

    // If hash on URL and tab is null, set appropriate tab
    useEffect(() => {
      if (hash !== "" && tabData[hash]) {
        setTab(hash);
      }
    }, [hash]);

    const BackButton = ({ onClick }) => {
      useEffect(() => {
        setTimeout(() => {
          tabs && tabs.current && tabs.current.scrollIntoView(true);
        }, 20);
      });

      return (
        <div
          className='flex flex-row text-blue-400 items-center'
          onClick={onClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z'
            />
          </svg>
          <div className='ml-1 text-sm font-light cursor-pointer py-2'>
            Back to More Options
          </div>
        </div>
      );
    };

    const Tab = ({ id, name, description, icon, href }) => {
      const className = (id, tabId) => {
        const base =
          "flex items-center justify-between text-lg p-5 rounded border mb-3 bg-white shadow-md border-gray-200 hover:shadow-lg";
        // No tab selected: Show all tabs
        if (!tab) return base;
        //   Tab Selected and it's not the active tab; Hide all other tabs to make room for content
        if (tab && id !== tabId) return base + " hidden";
        //   Display the tab as selected
        return base + " bg-gray-200 border-transparent";
      };
      return (
        <Transition
          show={true}
          appear={true}
          className='w-full'
          enter='transition ease-in-out duration-200 transform order-first'
          enterStart='opacity-0 translate-y-16'
          enterEnd='opacity-100 translate-y-0'
          leave='transition ease-in-out duration-300 transform absolute'
          leaveStart='opacity-100 translate-x-0'
          leaveEnd='opacity-0 -translate-x-16'
        >
          <a
            className={className(id, tab)}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              setTab(id);
            }}
          >
            <div>
              <div className='font-bold leading-snug tracking-tight mb-1'>
                {name}
              </div>
              {/* Show Description When No Tabs are Selected; Assume once tab is selected, description is taking up valuable screen space that can be used by something else */}
              {!tab && <div className='text-gray-600'>{description}</div>}
            </div>
            <div className='flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3'>
              {icon}
            </div>
          </a>
        </Transition>
      );
    };

    const TabContent = ({ id, children }) => (
      <Transition
        show={tab === id}
        appear={true}
        className='w-full'
        enter='transition ease-in-out duration-700 transform order-first'
        enterStart='opacity-0'
        enterEnd='opacity-100'
        leave='transition ease-in-out duration-300 transform absolute'
        leaveStart='opacity-100 translate-x-0'
        leaveEnd='opacity-0 -translate-x-16'
      >
        {children}
      </Transition>
    );

    return (
      <section className='relative'>
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className='absolute inset-0 bg-white pointer-events-none mb-16'
          aria-hidden='true'
        ></div>
        <div
          ref={getRef()}
          className='absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2'
        ></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='pt-12 md:pt-20'>
            {/* Section header */}
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
              <h1 className='h2 mb-2'>Data Discovery</h1>
              <p className='text-xl text-gray-600 mb-6'>
                Information Organized by State, Watershed, or Corps Office
              </p>
              <div className='italic font-light text-gray-400' ref={tabs}>
                Already know what you're looking for? Try a{" "}
                <span
                  className='text-blue-400 cursor-pointer'
                  onClick={(e) => {
                    doSearchOpen();
                  }}
                >
                  Keyword Search
                </span>
              </div>
            </div>

            {/* Section content */}
            <div className='md:grid md:grid-cols-12 md:gap-6'>
              {/* Content */}
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6'
                data-aos='fade-right'
              >
                {/* Back button to show all tabs if tab single tab selected */}
                {tab && (
                  <BackButton
                    onClick={(e) => {
                      setTab(null);
                      doUpdateHash("", { maintainScrollPosition: true });
                    }}
                  />
                )}

                <div className='mb-8 md:mb-0'>
                  {Object.keys(tabData).map((t, idx) => (
                    <Tab
                      key={idx}
                      id={t}
                      {...tabData[t]}
                      href={`/discovery#${t}`}
                    />
                  ))}
                </div>
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6'
                  data-aos='fade-right'
                >
                  <div className='mb-8 md:mb-0'>
                    {/* Office Selector */}
                    {(!tab || tab === "office") && (
                      <TabContent id='office'>
                        <Scrollbars style={{ minWidth: "100%", height: 400 }}>
                          <OfficeList />
                        </Scrollbars>
                      </TabContent>
                    )}
                    {/* States Table */}
                    {(!tab || tab === "state") && (
                      <TabContent id='state'>
                        <Scrollbars style={{ minWidth: "100%", height: 400 }}>
                          <StateList />
                        </Scrollbars>
                      </TabContent>
                    )}
                    {/* Watersheds Table*/}
                    {(!tab || tab === "watershed") && (
                      <TabContent id='watershed'>
                        <Scrollbars style={{ minWidth: "100%", height: 400 }}>
                          <WatershedList />
                        </Scrollbars>
                      </TabContent>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs Content */}
              {/* Hidden until screen size greater than LG */}
              <div
                className='hidden lg:block max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1'
                data-aos='zoom-y-out'
              >
                <div
                  style={{ height: 800 }}
                  className='relative flex flex-col text-center lg:text-right w-full '
                >
                  {/* Office Data Visualization */}
                  {tab === "office" && (
                    <>
                      <ToggleSwitchAllLocations />
                      <OfficeBarGraph />
                    </>
                  )}
                  {/* States Data Visualization */}
                  {tab === "state" && (
                    <>
                      <ToggleSwitchAllLocations />
                      <StateBarGraph />
                    </>
                  )}
                  {/* Watersheds Data Visualization */}
                  {tab === "watershed" && <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default Discovery;
