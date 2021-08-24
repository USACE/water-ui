import React from "react";
import { connect } from "redux-bundler-react";
import Search from "./Search";

import LocationDetail from "./LocationDetail";
import OfficeDetail from "./OfficeDetail";
import WatershedDetail from "./WatershedDetail";

const providers = {
  location: <LocationDetail />,
  watershed: <WatershedDetail />,
  office: <OfficeDetail />,
};

const DetailPanel = connect(
  "selectMapDetailPanelHeight",
  "selectSelectedProvider",
  ({ mapDetailPanelHeight: height, selectedProvider: provider }) => {
    const heightClass = {
      low: "h-24",
      medium: "h-1/2",
      high: "h-5/6",
    };
    return (
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-2xl ${heightClass[height]} bg-gray-600 overflow-hidden`}
      >
        <div className='w-full overflow-auto'>
          {!provider ? <Search /> : providers[provider]}
        </div>
      </div>
    );
  }
);

export default DetailPanel;
