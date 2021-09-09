import { createSelector } from "redux-bundler";

import ProjectDetail from "../app-plugins/project/Detail";
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
};

export default detailPanel;
