const settingsBundle = {
  name: "settings",
  reducer: (
    state = {
      // locationName: 'name', 'public_name'
      locationName: "public_name",
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SETTINGS_LOCATION_NAME_CHANGE":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
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
};

export default settingsBundle;
