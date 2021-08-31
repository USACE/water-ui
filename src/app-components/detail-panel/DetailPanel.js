import React, { useRef } from "react";
import { connect } from "redux-bundler-react";
import Search from "../search";

import useClickOutside from "../../hooks/useClickOutside";

const DetailPanel = connect(
  "selectDetailPanelHeight",
  "selectDetailPanelSelectedComponent",
  "doDetailPanelUpdateHeight",
  ({
    detailPanelHeight: height,
    detailPanelSelectedComponent: C,
    doDetailPanelUpdateHeight,
  }) => {
    const heightClass = {
      low: "h-24",
      medium: "h-1/2",
      high: "h-5/6",
    };
    const ref = useRef();

    useClickOutside(ref, () => {
      doDetailPanelUpdateHeight("low");
    });

    return (
      <div
        ref={ref}
        className={`fixed bottom-0 left-0 right-0 sm:w-1/3 lg:w-1/4 rounded-t-2xl ${heightClass[height]} md:h-5/6 bg-gray-600 overflow-hidden`}
      >
        <div className='w-full overflow-auto'>{!C ? <Search /> : <C />}</div>
      </div>
    );
  }
);

export default DetailPanel;
