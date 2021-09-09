import { createSelector } from "redux-bundler";
import createRestBundle from "../../app-bundles/create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "usgsSiteDetail",
  uid: "site_number",
  prefetch: true,
  staleAfter: 0,
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/usgs/sites/:site_number`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: ["SELECTED_ITEM"],
  urlParamSelectors: ["selectUsgsSiteDetailRouteSlug"],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectUsgsSiteDetailRouteSlug: createSelector(
      "selectSelectedKeys",
      // If selected item provider is "project", fill-in the route param to let ProjectDetail fetch
      (keys) =>
        keys && keys.provider === "usgsSite" ? { site_number: keys.uid } : {}
    ),
    selectUsgsSiteDetailSelected: createSelector(
      "selectUsgsSiteDetailItemsObject",
      "selectSelectedKeys",
      (obj, keys) => {
        if (keys.provider !== "usgsSite" || !obj[keys.uid]) {
          return null;
        }
        return obj[keys.uid];
      }
    ),
  },
});
