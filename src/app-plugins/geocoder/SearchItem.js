import React from "react";
import GeocoderIcon from "../../icons/GeocoderIcon";
import { SearchItem } from "../../app-components/search";
import { fromLonLat } from "ol/proj";

const SearchItemGeocoder = ({ provider, display_name, geometry, zoom }) => {
  return (
    <SearchItem
      key={`${provider}-${display_name}`}
      clickable={true}
      name={display_name}
      icon={GeocoderIcon}
      provider={provider}
      providerName='PLACE | MAPBOX GEOCODING'
      buttons={<></>}
      goTo={{ center: fromLonLat(geometry.coordinates), zoom: zoom }}
    />
  );
};

export default SearchItemGeocoder;
