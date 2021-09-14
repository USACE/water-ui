import { createSelector } from "redux-bundler";
import { fromLonLat } from "ol/proj";

const selectedBundle = {
  name: "selected",

  reducer: (
    state = {
      // @todo; accept selectable entities as a config parameter to avoid
      // having to make changes to this bundle directly
      _selectable: ["project", "office", "watershed", "usgsSite"],
      _shouldInitialize: true,
      provider: null,
      uid: null,
      goTo: null,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SELECTED_ITEM_CLEAR":
        return { ...state, provider: null, uid: null, goTo: null };
      case "SELECTED_INITIALIZE_START":
      case "SELECTED_INITIALIZE_FINISH":
      case "SELECTED_ITEM":
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  doSelectedInitialize:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "SELECTED_INITIALIZE_START",
        payload: { _shouldInitialize: false },
      });
      // Get selected info from URL route params and set in state
      const { provider = null, uid = null } = store.selectRouteParams();
      dispatch({
        type: "SELECTED_INITIALIZE_FINISH",
        payload: { provider: provider, uid: uid },
      });
    },
  doSelectedClear:
    () =>
    ({ dispatch, store }) => {
      store.doUpdateUrl({
        ...store.selectUrlObject(),
        pathname: "/",
      });

      // Notify
      dispatch({ type: "SELECTED_ITEM_CLEAR" });
    },
  doSelectedSelect:
    ({ provider, uid, goTo }) =>
    ({ dispatch, store }) => {
      if (provider && uid) {
        store.doUpdateUrl(`/${provider}/${uid}`, true);
      }
      if (goTo) {
        store.doMapsPositionGoTo("main", goTo.center, goTo.zoom);
      }
      dispatch({
        type: "SELECTED_ITEM",
        payload: { provider: provider, uid: uid, goTo: goTo },
      });
    },
  selectSelectedRaw: (state) => state.selected,
  selectSelectedKeys: createSelector("selectRouteParams", (routeParams) => {
    const provider = routeParams.provider;
    const uid = routeParams.uid;
    if (!provider || !uid) {
      return {};
    }
    return { provider: provider, uid: uid };
  }),
  selectSelectedProvider: (state) => state.selected.provider,
  selectSelectedUid: (state) => state.selected.uid,
  selectSelectedDetail: (state) =>
    !state.selected.provider || !state.selected.uid
      ? null
      : state[`${state.selected.provider}Detail`],
  selectSelectedDetailItem: createSelector(
    "selectSelectedDetail",
    "selectSelectedUid",
    (detail, uid) => (!detail || !uid || !detail[uid] ? null : detail[uid])
  ),
  selectSelectedXYZoom: createSelector("selectSelectedDetailItem", (item) => {
    if (!item || !item.geometry) {
      return null;
    }
    // GeoJSON POINT
    const [x, y] = fromLonLat(item.geometry.coordinates).map(
      (val) => Math.round(val * 100) / 100
    );
    return {
      x: x,
      y: y,
      zoom: 13,
    };
  }),
  reactSelectedInitialize: (state) =>
    !state.selected._shouldInitialize
      ? null
      : { actionCreator: "doSelectedInitialize" },
};

export default selectedBundle;
