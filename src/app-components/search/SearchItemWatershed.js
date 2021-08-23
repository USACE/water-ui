import React from "react";
import SearchItem from "./SearchItem";
import WatershedIcon from "../../icons/WatershedIcon";

const SearchItemWatershed = ({ uid, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      provider='watershed'
      uid={uid}
      key={uid}
      name={name}
      icon={WatershedIcon}
      providerName='Watershed'
      buttons={<></>}
    />
  );
};

export default SearchItemWatershed;
