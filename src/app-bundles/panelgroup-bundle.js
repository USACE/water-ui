const panelWidths = {
  detailPanelMinimized: [
    { minSize: 0, maxSize: 0, resize: "stretch" },
    { size: 72, minSize: 0, maxSize: 0, resize: "dynamic" },
  ],
  detailPanelMaximized: [
    { size: 72, minSize: 0, maxSize: 0, resize: "dynamic" },
    { minSize: 0, maxSize: 0, resize: "stretch" },
  ],
  equal: [
    { size: 240, minSize: 0, maxSize: 0, resize: "dynamic" },
    { minSize: 0, maxSize: 0, resize: "stretch" },
  ],
};

const panelgroupBundle = {
  name: "panelgroup",
  // persistActions: ["PANELGROUP_UPDATE_WIDTHS"],
  getReducer: () => {
    const initialState = {
      widths: panelWidths.equal,
    };
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case "SELECTED_ITEM":
          return { ...state, widths: panelWidths.equal };
        case "SEARCH_FOCUS":
          return { ...state, widths: panelWidths.detailPanelMaximized };
        case "PANELGROUP_UPDATE_WIDTHS":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  doPanelgroupUpdateWidths:
    (widths) =>
    ({ dispatch, store }) => {
      dispatch({
        type: "PANELGROUP_UPDATE_WIDTHS",
        payload: { widths: widths },
      });
    },
  selectPanelgroupWidths: (store) => store.panelgroup.widths,
};

export { panelWidths, panelgroupBundle as default };
