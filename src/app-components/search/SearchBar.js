import React, { useRef, useEffect, useMemo } from "react";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";

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

export default SearchBar;
