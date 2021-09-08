import { fromLonLat } from "ol/proj";
import React from "react";

import { SearchItem } from "../../app-components/search";

import ProjectIcon from "../../icons/ProjectIcon";

const SearchItemProject = ({
  provider,
  slug,
  public_name,
  clickable,
  geometry,
}) => {
  const { coordinates: center } = geometry;

  return (
    <SearchItem
      clickable={clickable}
      uid={slug}
      key={slug}
      provider={provider}
      icon={ProjectIcon}
      name={public_name}
      providerName={provider}
      buttons={<></>}
      goTo={{ center: fromLonLat(center), zoom: 13 }}
    />
  );
};

export default SearchItemProject;
