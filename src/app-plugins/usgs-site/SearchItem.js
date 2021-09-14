import React from "react";
import { SearchItem } from "../../app-components/search";
import UsgsSiteIcon from "./UsgsSiteIcon";

const SearchItemUsgsSite = ({
  provider,
  site_number,
  name,
  clickable = false,
}) => {
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
    />
  );
};

export default SearchItemUsgsSite;
