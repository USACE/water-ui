import React from "react";
import { connect } from "redux-bundler-react";
import Search from "./Search";

import LocationDetail from "./LocationDetail";
import OfficeDetail from "./OfficeDetail";
import WatershedDetail from "./WatershedDetail";

const DetailPanel = connect(
  "selectSelectedProvider",
  ({ selectedProvider: provider }) => {
    return (
      <div className='absolute bottom-0 w-11/12 h-3/5 left-1/2 transform -translate-x-1/2 md:w-4/12 md:transform-none md:left-0 md:h-full xl:w-3/12 bg-gray-800 font-mono overflow-y-auto overflow-x-hidden rounded-t-lg'>
        {!provider && <Search />}
        {provider && provider === "location" && <LocationDetail />}
        {provider && provider === "watershed" && <WatershedDetail />}
        {provider && provider === "office" && <OfficeDetail />}
      </div>
    );
  }
);

export default DetailPanel;
