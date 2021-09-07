import React from "react";
import { connect } from "redux-bundler-react";
import Search from "../search";

const DetailPanel = connect(
  "selectDetailPanelSelectedComponent",
  "doDetailPanelSizeMiddle",
  ({ detailPanelSelectedComponent: C }) => {
    return (
      <div
        className={`absolute left-0 top-0 h-full w-full bg-gray-600 md:w-1/3 md:h-5/6 md:bottom-0 md:top-auto md:rounded-t-2xl  lg:w-1/4`}
      >
        {!C ? <Search /> : <C />}
      </div>
    );
  }
);

export default DetailPanel;
