import React, { useRef, useMemo } from "react";
import { connect } from "redux-bundler-react";
import { SearchIcon } from "@heroicons/react/outline";

import debounce from "lodash/debounce";

const SearchBar = connect(
  "selectSearchQuery",
  "doSearchQueryUpdate",
  "doSearchFire",
  "doSearchFocus",
  ({ searchQuery, doSearchQueryUpdate, doSearchFire, doSearchFocus }) => {
    const searchInput = useRef(null);

    // debounced search fire function
    const debouncedSearchFire = useMemo(
      () => debounce(doSearchFire, 100),
      [doSearchFire]
    );

    return (
      <div className='relative'>
        {/* https://stackoverflow.com/questions/28455100/how-to-center-div-vertically-inside-of-absolutely-positioned-parent-div */}
        <div className='absolute w-5 top-1/2 transform -translate-y-1/2 ml-3 text-gray-500'>
          <SearchIcon />
        </div>
        <label htmlFor='modal-search' className='sr-only'>
          Search
        </label>
        <input
          id='modal-search'
          autoComplete='off'
          className={`w-full focus:outline-none focus:ring focus:border-purple-300 py-3 pl-10 rounded-t-xl ${
            searchQuery.length < 2 && "rounded-b-xl"
          }`}
          type='search'
          placeholder='Search…'
          value={searchQuery || ""}
          ref={searchInput}
          onChange={(e) => {
            doSearchQueryUpdate(e.target.value);
            debouncedSearchFire();
          }}
          onFocus={(e) => {
            doSearchFocus();
          }}
        />
        <div className='absolute top-0 bottom-0' aria-label='Search'></div>
      </div>
    );
  }
);

export default SearchBar;
