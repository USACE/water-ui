import React from "react";
import GeocoderIcon from "../icons/GeocoderIcon";
import SearchItem from "../search/SearchItem";

const SearchItemGeocoder = ({ name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      name={name}
      icon={GeocoderIcon}
      providerName='PLACE | MAPBOX GEOCODING'
      buttons={<></>}
    />
  );
};

export default SearchItemGeocoder;
