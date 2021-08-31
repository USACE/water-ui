const settingsBundle = {
  name: "settings",
  reducer: (
    state = {
      // locationName: 'name', 'public_name'
      locationName: "public_name",
      isOpen: false,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SETTINGS_PANEL_OPEN":
      case "SETTINGS_PANEL_CLOSE":
      case "SETTINGS_LOCATION_NAME_CHANGE":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doSettingsPanelOpen:
    () =>
    ({ dispatch, store }) => {
      dispatch({ type: "SETTINGS_PANEL_OPEN", payload: { isOpen: true } });
    },
  doSettingsPanelClose:
    () =>
    ({ dispatch }) => {
      dispatch({ type: "SETTINGS_PANEL_CLOSE", payload: { isOpen: false } });
    },
  doSettingsPanelToggleOpen:
    () =>
    ({ dispatch, store }) => {
      const isOpen = store.selectSettingsPanelIsOpen();
      dispatch({
        type: isOpen ? "SETTINGS_PANEL_CLOSE" : "SETTINGS_PANEL_OPEN",
        payload: { isOpen: !isOpen },
      });
    },
  doSettingsLocationNameChange:
    (name) =>
    ({ dispatch, store }) => {
      const valid = store.selectSettingsLocationNameOptions();
      if (!valid.includes(name)) {
        return;
      }
      dispatch({
        type: "SETTINGS_LOCATION_NAME_CHANGE",
        payload: { locationName: name },
      });
    },
  selectSettingsLocationName: (state) => state.settings.locationName,
  selectSettingsLocationNameOptions: (state) => ["name", "public_name"],
  selectSettingsPanelIsOpen: (state) => state.settings.isOpen,
};

export default settingsBundle;
