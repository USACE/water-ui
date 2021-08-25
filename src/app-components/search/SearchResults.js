import React from "react";
import { connect } from "redux-bundler-react";

const SearchResults = connect(
  "selectSearchItems",
  "selectSearchItemComponentMap",
  ({ searchItems, searchItemComponentMap: componentMap }) =>
    searchItems && searchItems.length ? (
      <>
        <div className='text-xs font-semibold text-gray-400 uppercase px-2 my-2'>
          Search Results
        </div>
        <ul className='absolute inset-0 top-20 inset-y-1 overflow-auto text-sm'>
          {searchItems.map((t) => {
            const func = componentMap[t.provider];
            return func && typeof func === "function" ? func(t) : null;
          })}
        </ul>
      </>
    ) : null
);

export default SearchResults;
