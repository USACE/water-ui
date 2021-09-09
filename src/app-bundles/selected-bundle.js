import { createSelector } from "redux-bundler";

const selectedBundle = {
  name: "selected",

  reducer: (
    state = {
      // @todo; accept selectable entities as a config parameter to avoid
      // having to make changes to this bundle directly
      _selectable: ["project", "office", "watershed", "usgsSite"],
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
    ({ provider, uid, goTo }) =>
    ({ dispatch, store }) => {
      const { x, y, zoom } = store.selectQueryObject();
      store.doUpdateQuery(
        {
          x: goTo ? goTo.center[0] : x,
          y: goTo ? goTo.center[1] : y,
          zoom: goTo ? goTo.zoom : zoom,
          [provider]: uid,
        },
        true
      );
      if (goTo) {
        store.doMapsGoTo("main", goTo.center, goTo.zoom);
      }
      dispatch({
        type: "SELECTED_ITEM",
        payload: { provider: provider, uid: uid, goTo: goTo },
      });
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
