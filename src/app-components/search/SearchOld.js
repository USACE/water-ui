import React, { useRef, useEffect } from "react";
import { connect } from "redux-bundler-react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = connect(
  "doSearchClose",
  "selectSearchIsOpen",
  "selectSearchItems",
  ({ doSearchClose, searchIsOpen, searchItems, outerRef }) => {
    const innerRef = useRef();

    const duration = 100;

    // Close on click outside of search modal
    useEffect(() => {
      const curRef = outerRef.current;
      const clickHandler = ({ target }) => {
        if (!searchIsOpen || innerRef.current.contains(target)) return;
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
        // setTimeout lets visual transitions finish before component disappears
        setTimeout(() => {
          doSearchClose();
        }, duration);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
      searchIsOpen && (
        <>
          {/* Gray Semi-Transparent Overlay */}
          {/* Modal backdrop */}
          <div
            className={`relative w-full md:max-w-2xl bg-white rounded shadow-lg ${
              searchItems && searchItems.length ? "h-3/4 overflow-y-hidden" : ""
            }`}
            ref={innerRef}
          >
            <SearchBar />
            {searchItems && searchItems.length ? <SearchResults /> : null}
          </div>
        </>
      )
    );
  }
);

export default Search;
