import React from "react";

import { SearchItem } from "../../app-components/search";

import ProjectIcon from "../../icons/ProjectIcon";

const SearchItemProject = ({ provider, slug, public_name, clickable }) => {
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
    />
  );
};

export default SearchItemProject;
