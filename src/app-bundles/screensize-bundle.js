import debounce from "lodash/debounce";
import { createSelector } from "redux-bundler";

const tailwindBreakpoints = [
  { id: "2xl", px: 1536 },
  { id: "xl", px: 1280 },
  { id: "lg", px: 1024 },
  { id: "md", px: 768 },
  { id: "sm", px: 640 },
  { id: "xs", px: 0 },
];

const screensizeBundle = {
  name: "screensize",
  reducer: (
    state = {
      px: null,
      shouldInitialize: true,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SCREENSIZE_UPDATE":
      case "SCREENSIZE_INITIALIZE":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doScreensizeInitialize:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "SCREENSIZE_INITIALIZE",
        payload: { shouldInitialize: false, px: window.innerWidth },
      });
      window.addEventListener(
        "resize",
        debounce(() => store.doScreensizeUpdate(window.innerWidth), 300)
      );
    },
  doScreensizeUpdate:
    (px) =>
    ({ dispatch, store }) => {
      dispatch({ type: "SCREENSIZE_UPDATE", payload: { px: px } });
    },
  selectScreensizePx: (store) => store.screensize.px,
  selectScreensizeBreakpoint: createSelector("selectScreensizePx", (px) =>
    !px ? null : tailwindBreakpoints.find((b) => px >= b.px).id
  ),
  reactScreensizeShouldInitialize: (state) => {
    if (state.screensize.shouldInitialize) {
      return { actionCreator: "doScreensizeInitialize" };
    }
  },
};

export default screensizeBundle;
