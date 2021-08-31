import React from "react";
import { SearchItem } from "../../app-components/search";
import WatershedIcon from "../../icons/WatershedIcon";

const SearchItemWatershed = ({ provider, slug, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      provider={provider}
      uid={slug}
      key={slug}
      name={name}
      icon={WatershedIcon}
      providerName={provider}
      buttons={<></>}
    />
  );
};

export default SearchItemWatershed;
