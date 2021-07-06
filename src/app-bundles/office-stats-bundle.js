import createRestBundle from "./create-rest-bundle";
import { createSelector } from "redux-bundler";
const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "officeStats",
  uid: "office_id",
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: "officeId",
  getTemplate: `${apiUrl}/stats/offices`,
  putTemplate: ":/",
  postTemplate: ":/",
  deleteTemplate: ":/",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: null,
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectOfficeStatsActive: createSelector(
      "selectOfficeStatsItemsObject",
      "selectOfficeByRoute",
      (obj, office) =>
        office && obj && obj.hasOwnProperty(office.id) ? obj[office.id] : null
    ),
  },
});
