import { createSelector } from "redux-bundler";

const selectedBundle = {
  name: "selected",

  reducer: (
    state = {
      _selectable: ["location", "office", "watershed"],
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SELECTED_ITEM":
      case "SELECTED_ITEM_CLEAR":
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  doSelectedClear:
    () =>
    ({ dispatch, store }) => {
      const queryObj = store.selectQueryObject();
      const keys = store.selectSelectedKeys();

      // Remove
      delete queryObj[keys.provider];
      store.doUpdateQuery(queryObj, true);
      // Notify
      dispatch({ type: "SELECTED_ITEM_CLEAR", payload: keys });
    },
  doSelectedSelect:
    ({ provider, uid }) =>
    ({ dispatch, store }) => {
      const q = store.selectQueryObject();
      store.doUpdateQuery(
        {
          x: q["x"],
          y: q["y"],
          zoom: q["zoom"],
          [provider]: uid,
        },
        true
      );
      dispatch({ type: "SELECTED_ITEM" });
    },
  selectSelectedRaw: (state) => state.selected,
  selectSelectedSelectables: (state) => state.selected._selectable,
  selectSelectedKeys: createSelector(
    "selectQueryObject",
    "selectSelectedSelectables",
    (queryObj, valid) => {
      // Return first found valid selectable
      const provider = valid.find((v) => queryObj[v]);
      return !provider ? {} : { provider: provider, uid: queryObj[provider] };
    }
  ),
  selectSelectedProvider: createSelector(
    "selectSelectedKeys",
    (keys) => keys.provider || null
  ),
  selectSelectedUid: createSelector(
    "selectSelectedKeys",
    (keys) => keys.uid || null
  ),
};

export default selectedBundle;
