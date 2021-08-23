import React from "react";

import SearchItem from "./SearchItem";

import LocationIcon from "../../icons/LocationIcon";

const SearchItemLocation = ({ uid, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      uid={uid}
      key={uid}
      provider='location'
      icon={LocationIcon}
      name={name}
      providerName='Location'
      buttons={<></>}
    />
  );
};

export default SearchItemLocation;
