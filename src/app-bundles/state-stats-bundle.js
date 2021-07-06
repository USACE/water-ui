import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "stateStats",
  uid: "state_id",
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/stats/states`,
  putTemplate: ":/",
  postTemplate: ":/",
  deleteTemplate: ":/",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "projects",
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectStateStatsActive: createSelector(
      "selectStateStatsItemsObject",
      "selectStateByRoute",
      (obj, state) =>
        state && obj && obj.hasOwnProperty(state.id) ? obj[state.id] : null
    ),
  },
});
