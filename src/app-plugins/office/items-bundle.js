import { createSelector } from "redux-bundler";
import createRestBundle from "../../app-bundles/create-rest-bundle";

const apiUrl = process.env.REACT_APP_SHARED_API_URL;

export default createRestBundle({
  name: "office",
  uid: "symbol",
  prefetch: true,
  staleAfter: 3600000, //milliseconds; 1Hour
  persist: true,
  routeParam: "officeSymbol",
  getTemplate: `${apiUrl}/offices`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "symbol",
  sortAsc: true,
  addons: {
    selectOfficeIdByRoute: createSelector("selectOfficeByRoute", (office) =>
      office && office.id ? { officeId: office.id } : {}
    ),
    selectOfficeItemsObjectById: createSelector(
      "selectOfficeItemsArray",
      (items) => {
        const obj = {};
        items.forEach((t) => (obj[t.id] = t));
        return obj;
      }
    ),
    selectOfficeItemsWithStats: createSelector(
      "selectOfficeStatsItemsObject",
      "selectOfficeItems",
      (statsObj, offices) => {
        if (!statsObj) return [];
        const items = [];
        offices.forEach((f) => {
          // Exclude offices with zero CWMS Locations from results
          if (!statsObj[f.id] || statsObj[f.id].locations === 0) return;
          items.push({ ...f, ...statsObj[f.id] });
        });
        return items;
      }
    ),
    selectOfficeActive: createSelector(
      "selectQueryObject",
      "selectOfficeItemsObject",
      (queryObj, officeObj) => {
        return (
          (queryObj.office && officeObj[queryObj.office.toUpperCase()]) || null
        );
      }
    ),
  },
});
