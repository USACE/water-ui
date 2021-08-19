import React from "react";
import { connect } from "redux-bundler-react";

import SearchItemGeocoder from "./SearchItemGeocoder";
import SearchItemLocation from "./SearchItemLocation";
import SearchItemOffice from "./SearchItemOffice";
import SearchItemProject from "./SearchItemProject";
import SearchItemWatershed from "./SearchItemWatershed";

const SearchResults = connect("selectSearchItems", ({ searchItems }) =>
  searchItems && searchItems.length ? (
    <>
      <div className='text-xs font-semibold text-gray-400 uppercase px-2 mb-2'>
        Search Results
      </div>
      <ul className='absolute inset-0 top-20 inset-y-1 overflow-auto text-sm'>
        {searchItems.map((t) => {
          switch (t.provider) {
            case "location":
              return t.kind.toUpperCase() === "PROJECT" ? (
                <SearchItemProject
                  clickable={true}
                  uid={t.slug}
                  name={t.public_name}
                />
              ) : (
                <SearchItemLocation
                  clickable={true}
                  uid={t.slug}
                  name={t.public_name}
                />
              );
            case "office":
              return (
                <SearchItemOffice
                  clickable={true}
                  uid={t.symbol}
                  name={t.name}
                />
              );
            case "geocoder":
              return <SearchItemGeocoder name={t.display_name} />;
            case "watershed":
              return (
                <SearchItemWatershed
                  clickable={true}
                  uid={t.slug}
                  name={t.name}
                />
              );
            default:
              return null;
          }
        })}
      </ul>
    </>
  ) : null
);

export default SearchResults;
