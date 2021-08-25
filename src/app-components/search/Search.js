import React from "react";
import { connect } from "redux-bundler-react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = connect("selectSearchItems", ({ searchItems }) => {
  return (
    <div
      className={`mt-6 rounded-xl absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-95 w-11/12 bg-white shadow-lg ${
        searchItems && searchItems.length ? "h-3/4 overflow-y-hidden" : ""
      }`}
    >
      <SearchBar />
      <SearchResults />
    </div>
  );
});

export default Search;
