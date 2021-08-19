import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "locationDetail",
  uid: "slug",
  prefetch: true,
  staleAfter: 0,
  persist: false,
  routeParam: "slug",
  getTemplate: `${apiUrl}/locations/:slug/details`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: ["SELECTED_ITEM"],
  urlParamSelectors: ["selectLocationDetailRouteSlug"],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectLocationDetailRouteSlug: createSelector(
      "selectSelectedKeys",
      // If selected item provider is "location", fill-in the route param to let locationDetail fetch
      (keys) => (keys && keys.provider === "location" ? { slug: keys.uid } : {})
    ),
    selectLocationDetailSelected: createSelector(
      "selectLocationDetailItemsObject",
      "selectSelectedKeys",
      (obj, keys) => {
        if (keys.provider !== "location" || !obj[keys.uid]) {
          return null;
        }
        return obj[keys.uid];
      }
    ),
  },
});
