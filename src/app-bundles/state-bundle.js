import createRestBundle from "./create-rest-bundle";
import { createSelector } from "redux-bundler";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "state",
  uid: "abbreviation",
  prefetch: true,
  staleAfter: 0, //5min
  persist: true,
  routeParam: "stateSymbol",
  getTemplate: `${apiUrl}/states`,
  putTemplate: `:/`,
  postTemplate: `:/`,
  deleteTemplate: `:/`,
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  addons: {
    selectStateIdByRoute: createSelector("selectStateByRoute", (state) =>
      state && state.id ? { stateId: state.id } : {}
    ),
    selectStateItemsObjectById: createSelector(
      "selectStateItemsArray",
      (items) => {
        let obj = {};
        items.forEach((t) => {
          obj[t.id] = t;
        });
        return obj;
      }
    ),
    selectStateItemsWithStats: createSelector(
      "selectStateStatsItemsObject",
      "selectStateItems",
      (statsObj, states) =>
        statsObj && states.map((s) => ({ ...s, ...statsObj[s.id] }))
    ),
    selectStateActive: createSelector(
      "selectQueryObject",
      "selectStateItemsObject",
      (queryObj, stateObj) =>
        (queryObj.state && stateObj[queryObj.state.toUpperCase()]) || null
    ),
  },
});
