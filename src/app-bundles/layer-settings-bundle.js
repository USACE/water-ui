const layerSettingsBundle = {
  name: "layerSettings",
  // Cache collapsed state of layer settings section
  persistActions: ["LAYER_SETTINGS_TOGGLE_COLLAPSE"],
  reducer: (
    state = {
      _isCollapsed: false,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "LAYER_UPDATED":
        return {
          ...state,
          [payload.id]: {
            ...{ visible: true },
            ...((state[payload.id] && state[payload.id].settings) || {}),
            ...(payload.settings || {}),
          },
        };
      case "LAYER_SETTINGS_TOGGLE_COLLAPSE":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doLayerSettingsToggleCollapse:
    () =>
    ({ dispatch, store }) => {
      const isCollapsed = store.selectLayerSettingsIsCollapsed();
      dispatch({
        type: "LAYER_SETTINGS_TOGGLE_COLLAPSE",
        payload: { _isCollapsed: !isCollapsed },
      });
    },
  selectLayerSettingsIsCollapsed: (state) => state.layerSettings._isCollapsed,
  selectLayerSettings: (state) => state.layerSettings,
};

export default layerSettingsBundle;
