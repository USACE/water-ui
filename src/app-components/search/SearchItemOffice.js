import React from "react";
import OfficeIcon from "../icons/OfficeIcon";
import SearchItem from "./SearchItem";

const SearchItemOffice = ({ uid, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      provider='office'
      uid={uid}
      key={uid}
      icon={OfficeIcon}
      name={name}
      providerName='Office / Area of responsibility'
      buttons={<></>}
    />
  );
};

export default SearchItemOffice;
