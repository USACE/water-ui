import React from "react";
import OfficeIcon from "../../icons/OfficeIcon";
import { SearchItem } from "../../app-components/search";

const SearchItemOffice = ({ provider, symbol, name, clickable }) => {
  return (
    <SearchItem
      clickable={clickable}
      provider={provider}
      uid={symbol}
      key={symbol}
      icon={OfficeIcon}
      name={name}
      providerName='Office / Area of responsibility'
      buttons={<></>}
    />
  );
};

export default SearchItemOffice;
