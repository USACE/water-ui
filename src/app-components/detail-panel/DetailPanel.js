import React from "react";
import { connect } from "redux-bundler-react";
import Search from "../search";

const DetailPanel = connect(
  "selectDetailPanelHeight",
  "selectDetailPanelSelectedComponent",
  ({ detailPanelHeight: height, detailPanelSelectedComponent: C }) => {
    const heightClass = {
      low: "h-24",
      medium: "h-1/2",
      high: "h-5/6",
    };
    return (
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-2xl ${heightClass[height]} bg-gray-600 overflow-hidden`}
      >
        <div className='w-full overflow-auto'>{!C ? <Search /> : <C />}</div>
      </div>
    );
  }
);

export default DetailPanel;
