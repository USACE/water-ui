import { createSelector } from "redux-bundler";

import LocationDetail from "../app-plugins/location/LocationDetail";
import OfficeDetail from "../app-plugins/office/OfficeDetail";
import WatershedDetail from "../app-plugins/watershed/WatershedDetail";

const detailPanel = {
  name: "detailPanel",
  reducer: (state = { height: "low" }, { type, payload }) => {
    switch (type) {
      case "SEARCH_FOCUS":
        return { ...state, height: "high" };
      case "SELECTED_ITEM":
        return state.height !== "medium"
          ? { ...state, height: "medium" }
          : state;
      case "SELECTED_ITEM_CLEAR":
        return state.height !== "low" ? { ...state, height: "low" } : state;
      case "DETAIL_PANEL_UPDATE_HEIGHT":
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  doDetailPanelUpdateHeight:
    (height) =>
    ({ dispatch }) => {
      dispatch({
        type: "DETAIL_PANEL_UPDATE_HEIGHT",
        payload: {
          height: height,
        },
      });
    },
  selectDetailPanelRaw: (state) => state.detailPanel,
  selectDetailPanelHeight: (state) => state.detailPanel.height,
  // @todo: Should make this configurable via a plugin
  selectDetailPanelProviderComponentMap: (state) => ({
    location: LocationDetail,
    watershed: WatershedDetail,
    office: OfficeDetail,
  }),
  selectDetailPanelSelectedComponent: createSelector(
    "selectSelectedProvider",
    "selectDetailPanelProviderComponentMap",
    (selected, componentMap) => componentMap[selected] || null
  ),
};

export default detailPanel;
