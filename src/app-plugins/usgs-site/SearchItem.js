import { fromLonLat } from "ol/proj";
import React from "react";
import { SearchItem } from "../../app-components/search";
import UsgsSiteIcon from "./UsgsSiteIcon";

const SearchItemUsgsSite = ({
  provider,
  site_number,
  name,
  geometry,
  clickable = false,
}) => {
  const { coordinates: center } = geometry;

  return (
    <SearchItem
      clickable={clickable}
      provider={provider}
      uid={site_number}
      key={site_number}
      name={name}
      icon={UsgsSiteIcon}
      providerName='USGS Site'
      buttons={<></>}
      goTo={{ center: fromLonLat(center), zoom: 13 }}
    />
  );
};

export default SearchItemUsgsSite;
