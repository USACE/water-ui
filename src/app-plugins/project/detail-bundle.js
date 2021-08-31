import { createSelector } from "redux-bundler";
import createRestBundle from "../../app-bundles/create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "projectDetail",
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
  urlParamSelectors: ["selectProjectDetailRouteSlug"],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: false,
  addons: {
    selectProjectDetailRouteSlug: createSelector(
      "selectSelectedKeys",
      // If selected item provider is "project", fill-in the route param to let ProjectDetail fetch
      (keys) => (keys && keys.provider === "project" ? { slug: keys.uid } : {})
    ),
    selectProjectDetailSelected: createSelector(
      "selectProjectDetailItemsObject",
      "selectSelectedKeys",
      (obj, keys) => {
        if (keys.provider !== "project" || !obj[keys.uid]) {
          return null;
        }
        return obj[keys.uid];
      }
    ),
  },
});
