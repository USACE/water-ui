import React from "react";
import GeocoderIcon from "../../icons/GeocoderIcon";
import { SearchItem } from "../../app-components/search";

const SearchItemGeocoder = ({ provider, display_name }) => {
  return (
    <SearchItem
      key={`${provider}-${display_name}`}
      clickable={false}
      name={display_name}
      icon={GeocoderIcon}
      provider={provider}
      providerName='PLACE | MAPBOX GEOCODING'
      buttons={<></>}
    />
  );
};

export default SearchItemGeocoder;
