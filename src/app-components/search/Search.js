import React, { useRef, useEffect, useState } from "react";
import { connect } from "redux-bundler-react";

import Transition from "../../utils/Transition.js";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

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
      if (!searchIsOpen) {
        setShow(false);
        return;
      }
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
