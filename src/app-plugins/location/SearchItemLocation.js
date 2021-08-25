import React from "react";

import { SearchItem } from "../../app-components/search";

import LocationIcon from "../../icons/LocationIcon";

const SearchItemLocation = ({ provider, slug, public_name }) => {
  return (
    <SearchItem
      clickable={true}
      uid={slug}
      key={slug}
      provider={provider}
      icon={LocationIcon}
      name={public_name}
      providerName={provider}
      buttons={<></>}
    />
  );
};

export default SearchItemLocation;
