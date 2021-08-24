const mapDetailPanel = {
  name: "mapDetailPanel",
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
      case "MAP_DETAIL_PANEL_UPDATE_HEIGHT":
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  doMapDetailPanelUpdateHeight:
    (height) =>
    ({ dispatch }) => {
      dispatch({
        type: "MAP_DETAIL_PANEL_UPDATE_HEIGHT",
        payload: {
          height: height,
        },
      });
    },
  selectMapDetailPanelRaw: (state) => state.mapDetailPanel,
  selectMapDetailPanelHeight: (state) => state.mapDetailPanel.height,
};

export default mapDetailPanel;
