import React, { useRef, useEffect, useState, useMemo } from "react";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";

import SearchItemGeocoder from "./SearchItemGeocoder";
import SearchItemLocation from "./SearchItemLocation";
import SearchItemOffice from "./SearchItemOffice";
import SearchItemWatershed from "./SearchItemWatershed";

import Transition from "../../utils/Transition.js";

const Item = ({ provider, ...rest }) => {
  switch (provider) {
    case "location":
      return <SearchItemLocation {...rest} />;
    case "office":
      return <SearchItemOffice {...rest} />;
    case "geocoder":
      return <SearchItemGeocoder {...rest} />;
    case "watershed":
      return <SearchItemWatershed {...rest} />;
    default:
      return null;
  }
};

const SearchBar = connect(
  "selectSearchQuery",
  "doSearchQueryUpdate",
  "doSearchFire",
  ({ searchQuery, doSearchQueryUpdate, doSearchFire }) => {
    const searchInput = useRef(null);

    // debounced search fire function
    const debouncedSearchFire = useMemo(
      () => debounce(doSearchFire, 100),
      [doSearchFire]
    );

    // set focus on input
    useEffect(() => {
      searchInput.current.focus();
    });

    return (
      <form className='border-b border-gray-200'>
        <div className='relative'>
          <label htmlFor='modal-search' className='sr-only'>
            Search
          </label>
          <input
            id='modal-search'
            autoComplete='off'
            className='w-full border-0 focus:ring-transparent placeholder-gray-400 py-3 pl-10 pr-4'
            type='search'
            placeholder='Search Anything…'
            value={searchQuery || ""}
            ref={searchInput}
            onChange={(e) => {
              doSearchQueryUpdate(e.target.value);
              debouncedSearchFire();
            }}
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
    );
  }
);

const Search = connect(
  "doSearchClose",
  "selectSearchIsOpen",
  "selectSearchItems",
  ({ doSearchClose, searchIsOpen, searchItems, outerRef }) => {
    const innerRef = useRef();
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

    const SearchResults = () => (
      <>
        <div className='text-xs font-semibold text-gray-400 uppercase px-2 mb-2'>
          Search Results
        </div>
        <ul className='absolute inset-0 top-20 inset-y-1 overflow-auto text-sm'>
          {searchItems.map((t) => (
            <Item {...t} />
          ))}
        </ul>
      </>
    );

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
            className='fixed inset-0 z-50 flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6 w-200'
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
              className={`relative w-full md:max-w-2xl bg-white rounded shadow-lg ${
                searchItems && searchItems.length
                  ? "h-3/4 overflow-y-hidden"
                  : ""
              }`}
              ref={innerRef}
            >
              <SearchBar />
              {searchItems && searchItems.length ? <SearchResults /> : null}
            </div>
          </Transition>
        </>
      )
    );
  }
);

export default Search;
