import { createSelector } from "redux-bundler";

const modalMapBundle = {
  name: "modalMap",
  getReducer: () => {
    const initialData = {
      _isOpen: false,
      _closeUrl: "/",
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "MODAL_MAP_OPEN":
        case "MODAL_MAP_CLOSE":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  doModalMapOpen:
    () =>
    ({ dispatch, store }) => {
      const p = store.selectUrlObject().href;
      // If app started with directly visiting "/map",
      // this sets the url on close to "/"
      const closeUrl = p === "/map" ? "/" : p;
      store.doUpdateUrl("/map");
      dispatch({
        type: "MODAL_MAP_OPEN",
        payload: {
          _closeUrl: closeUrl,
        },
      });
    },
  doModalMapClose:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "MODAL_MAP_CLOSE",
        payload: {
          _isOpen: false,
        },
      });
      store.doUpdateUrl(store.selectModalMapCloseUrl());
    },
  selectModalMapIsOpen: createSelector("selectPathname", (pathname) => {
    return pathname === "/map" ? true : false;
  }),
  selectModalMapCloseUrl: (state) => state.modalMap._closeUrl,
};

export default modalMapBundle;
