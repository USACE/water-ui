import React from "react";
import { connect } from "redux-bundler-react";

import SearchBar from "../../../app-components/search/SearchBar";
import SearchResults from "../../../app-components/search/SearchResults";

const Search = connect("selectSearchItems", ({ searchItems }) => {
  return (
    <div
      className={`rounded-tr-xl absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-95 w-11/12 bg-white rounded shadow-lg ${
        searchItems && searchItems.length ? "h-3/4 overflow-y-hidden" : ""
      }`}
    >
      <SearchBar />
      <SearchResults />
    </div>
  );
});

export default Search;
