const basemapSettingsBundle = {
  name: "basemapSettings",
  // Cache collapsed state of basemap settings section
  persistActions: ["BASEMAP_SETTINGS_TOGGLE_COLLAPSE"],
  reducer: (
    state = {
      _isCollapsed: false,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "BASEMAP_SETTINGS_TOGGLE_COLLAPSE":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doBasemapSettingsToggleCollapse:
    () =>
    ({ dispatch, store }) => {
      const isCollapsed = store.selectBasemapSettingsIsCollapsed();
      dispatch({
        type: "BASEMAP_SETTINGS_TOGGLE_COLLAPSE",
        payload: { _isCollapsed: !isCollapsed },
      });
    },
  selectBasemapSettingsIsCollapsed: (state) =>
    state.basemapSettings._isCollapsed,
};

export default basemapSettingsBundle;
