import React, { useRef } from "react";
import { connect } from "redux-bundler-react";
import Search from "../search";

import useClickOutside from "../../hooks/useClickOutside";

import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";

const ResizePanelButton = connect(
  "doDetailPanelUpdateHeight",
  ({ doDetailPanelUpdateHeight, currentSize, operation }) => {
    const nextSizeUp = {
      low: "medium",
      medium: "high",
      high: null,
    };
    const nextSizeDown = {
      low: null,
      medium: "low",
      high: "medium",
    };
    // nextSize will either be 'grow' or 'shrink'
    const nextSize =
      operation === "grow"
        ? nextSizeUp[currentSize]
        : nextSizeDown[currentSize];
    return (
      <button
        onClick={(e) => {
          if (nextSize) {
            doDetailPanelUpdateHeight(nextSize);
          }
        }}
        className={`flex justify-center items-center bg-gray-700 opacity-80 shadow-2xl shadow-inner w-12 h-8 rounded-xl text-purple-300  ${
          !nextSize ? "hidden" : ""
        }`}
      >
        {operation === "grow" ? (
          <ChevronDoubleUpIcon className='h-6 w-6 opacity-100' />
        ) : (
          <ChevronDoubleDownIcon className='h-6 w-6 opacity-100' />
        )}
      </button>
    );
  }
);

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

    // If details panel is fully expanded and click outside
    useClickOutside(ref, () => {
      if (height === "high") {
        doDetailPanelUpdateHeight("medium");
      }
    });

    return (
      <div
        ref={ref}
        className={`fixed bottom-0 left-0 right-0 sm:w-1/3 lg:w-1/4 rounded-t-2xl ${heightClass[height]} md:h-5/6 bg-gray-600`}
      >
        <div className='absolute sm:hidden flex justify-center space-x-5 w-full transform -translate-y-1/2'>
          <ResizePanelButton currentSize={height} operation='grow' />
          <ResizePanelButton currentSize={height} operation='shrink' />
        </div>
        <div className='w-full overflow-auto'>{!C ? <Search /> : <C />}</div>
      </div>
    );
  }
);

export default DetailPanel;
