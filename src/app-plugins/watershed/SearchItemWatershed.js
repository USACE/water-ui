import React from "react";
import { SearchItem } from "../../app-components/search";
import WatershedIcon from "../../icons/WatershedIcon";

const SearchItemWatershed = ({ uid, name }) => {
  return (
    <SearchItem
      clickable={true}
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
