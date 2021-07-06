import React, { useRef, useEffect, useState } from "react";
import { connect } from "redux-bundler-react";
import Transition from "../utils/Transition.js";

const SearchButton = connect("doSearchOpen", ({ doSearchOpen }) => {
  return (
    <button
      className={
        "w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-200 transition duration-150 rounded-full ml-3"
      }
      onClick={(e) => {
        e.preventDefault();
        doSearchOpen();
      }}
      aria-controls='search-modal'
    >
      <span className='sr-only'>Search</span>
      <svg
        className='w-6 h-6'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='fill-current text-gray-100'
          d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z'
        />
        <path
          className='fill-current text-gray-100'
          d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z'
        />
      </svg>
    </button>
  );
});

const SearchModal = connect(
  "doSearchClose",
  "selectSearchIsOpen",
  ({ doSearchClose, searchIsOpen, outerRef }) => {
    const innerRef = useRef();
    const searchInput = useRef(null);
    const [show, setShow] = useState(false);

    const duration = 100;
    const durationClass = "duration-100";

    // Start CSS Transition
    useEffect(() => {
      if (!searchIsOpen) return;
      setShow(true);
    }, [searchIsOpen]);

    // Close on click outside of search modal
    useEffect(() => {
      const curRef = outerRef.current;
      const clickHandler = ({ target }) => {
        if (!searchIsOpen || innerRef.current.contains(target)) return;
        setShow(false);
        setTimeout(() => {
          doSearchClose();
        }, duration);
      };
      curRef.addEventListener("click", clickHandler);
      return () => curRef.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (keyCode !== 27) return;
        setShow(false);
        // setTimeout lets visual transitions finish before component disappears
        setTimeout(() => {
          doSearchClose();
        }, duration);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    });

    // set focus on input
    useEffect(() => {
      if (!show) return;
      searchInput.current.focus();
    });

    return (
      searchIsOpen && (
        <>
          {/* Gray Semi-Transparent Overlay */}
          {/* Modal backdrop */}
          <Transition
            className='fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity'
            show={show}
            enter={`transition ease-out ${durationClass}`}
            enterStart='opacity-0'
            enterEnd='opacity-100'
            leave={`transition ease-out ${durationClass}`}
            leaveStart='opacity-100'
            leaveEnd='opacity-0'
            aria-hidden='true'
          />
          <Transition
            className='fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6 w-200'
            role='dialog'
            aria-modal='true'
            show={show}
            enter={`transition ease-in-out ${durationClass}`}
            enterStart='opacity-0 translate-y-4'
            enterEnd='opacity-100 translate-y-0'
            leave={`transition ease-in-out ${durationClass}`}
            leaveStart='opacity-100 translate-y-0'
            leaveEnd='opacity-0 translate-y-4'
          >
            <div
              className='w-full md:max-w-2xl bg-white overflow-auto max-h-full rounded shadow-lg'
              ref={innerRef}
            >
              {/* Search form */}
              <form className='border-b border-gray-200'>
                <div className='relative'>
                  <label htmlFor='modal-search' className='sr-only'>
                    Search
                  </label>
                  <input
                    id='modal-search'
                    className='w-full border-0 focus:ring-transparent placeholder-gray-400 py-3 pl-10 pr-4'
                    type='search'
                    placeholder='Search Anything…'
                    ref={searchInput}
                  />
                  <button
                    className='absolute inset-0 right-auto group'
                    type='submit'
                    aria-label='Search'
                  >
                    <svg
                      className='w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-2'
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
                      <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
                    </svg>
                  </button>
                </div>
              </form>
              <div>
                {/* Recent searches */}
                <div className='mb-3 last:mb-0'>
                  <div className='text-xs font-semibold text-gray-400 uppercase px-2 mb-2'>
                    Recent searches
                  </div>
                  <ul className='text-sm'>
                    <li></li>
                  </ul>
                </div>
                {/* Recent pages */}
                <div className='mb-3 last:mb-0'>
                  <div className='text-xs font-semibold text-gray-400 uppercase px-2 mb-2'>
                    Recent pages
                  </div>
                  <ul className='text-sm'>
                    <li>item 1</li>
                    <li>item 2</li>
                  </ul>
                </div>
              </div>
            </div>
          </Transition>
        </>
      )
    );
  }
);

export { SearchButton, SearchModal };
