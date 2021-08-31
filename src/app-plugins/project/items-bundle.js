import { createSelector } from "redux-bundler";
import createRestBundle from "../../app-bundles/create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "project",
  uid: "slug",
  prefetch: true,
  staleAfter: 3600000, //5min
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/locations?kind_id=460ea73b-c65e-4fc8-907a-6e6fd2907a99`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: true,
  state: {},
  addons: {
    selectProjectItemsActive: createSelector(
      "selectQueryObject",
      "selectProjectItemsObject",
      (queryObj, itemsObj) => {
        // If ?location=<slug> in the query, single location selected
        if (queryObj && queryObj.project) {
          return itemsObj[queryObj.location];
        }
      }
    ),
    selectProjectItemsGeoJSON: createSelector("selectProjectItems", (items) =>
      !items || !items.length
        ? null
        : {
            type: "FeatureCollection",
            features: items.map((t) => ({
              type: "Feature",
              geometry: t.geometry,
              properties: {
                office: t.office_id,
                state: t.state_id,
                name: t.name,
                public_name: t.public_name,
              },
            })),
          }
    ),
  },
});
