import { createSelector } from "redux-bundler";

import ProjectDetail from "../app-plugins/project/detail";
import OfficeDetail from "../app-plugins/office/OfficeDetail";
import WatershedDetail from "../app-plugins/watershed/WatershedDetail";
import UsgsSiteDetail from "../app-plugins/usgs-site/Detail";

const detailPanel = {
  name: "detailPanel",
  getReducer: () => {
    const initialState = {
      panels: [],
    };
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case "SEARCH_FOCUS":
          return { ...state, height: "high" };
        default:
          return state;
      }
    };
  },
  selectDetailPanelRaw: (state) => state.detailPanel,
  // @todo: Should make this configurable via a plugin
  selectDetailPanelProviderComponentMap: (state) => ({
    project: ProjectDetail,
    watershed: WatershedDetail,
    office: OfficeDetail,
    usgsSite: UsgsSiteDetail,
  }),
  selectDetailPanelSelectedComponent: createSelector(
    "selectSelectedProvider",
    "selectDetailPanelProviderComponentMap",
    (selected, componentMap) => componentMap[selected] || null
  ),
  selectDetailPanelLayout: createSelector("selectScreensizePx", (px) => {
    if (!px) {
      return null;
    }
    return px >= 768 ? "desktop" : "mobile";
  }),
  selectDetailPanelWidth: createSelector("selectScreensizePx", (px) => {
    if (!px) {
      return null;
    }
    // Full Screen Width on Mobile; md:w-1/3; lg:w-1/4 on mobile
    if (px < 768) {
      return px;
    } else if (px < 1024) {
      return Math.round(px / 3);
    } else {
      return Math.round(px / 4);
    }
  }),
  selectDetailPanelMapPadding: createSelector(
    "selectDetailPanelLayout",
    "selectDetailPanelWidth",
    (layout, panelWidth) => {
      if (!layout || !panelWidth) {
        return null;
      }
      if (layout === "desktop") {
        return [0, 0, 0, panelWidth];
      }
      return [0, 0, 0, 0];
    }
  ),
};

export default detailPanel;
