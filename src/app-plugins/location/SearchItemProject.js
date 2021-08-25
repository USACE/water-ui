import React from "react";

import { SearchItem } from "../../app-components/search";

import ProjectIcon from "../../icons/ProjectIcon";

const SearchItemProject = ({ uid, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      uid={uid}
      provider='location'
      key={uid}
      icon={ProjectIcon}
      name={name}
      providerName={"Project"}
      buttons={<></>}
    />
  );
};

export default SearchItemProject;
