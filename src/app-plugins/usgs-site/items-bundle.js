import { createSelector } from "redux-bundler";
import createRestBundle from "../../app-bundles/create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "usgsSite",
  uid: "site_number",
  prefetch: true,
  staleAfter: 3600000, //5min
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/usgs/sites`,
  // getTemplate: `${apiUrl}/usgs/sites?state=:state_abbrev`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: null,
  sortAsc: true,
  mergeItems: true,
  state: {},
  addons: {
    // @todo; better wholistic implementation for fetching USGS Sites
    // Fetching all sites for entire USA puts too much stress on rendering at high
    // zoom levels.
    // For now, this supports the following behavior. On initial app load,
    // if no USGS Site is selected, fetch all gages for a single state as an
    // example. Whenever a USGS site is selected, fetch the state the gage resides
    // in and draw the layer. This ensures that when a USGS gage is selected outside
    // the default state.
    selectUsgsSiteItemsGeoJSON: createSelector("selectUsgsSiteItems", (items) =>
      !items || !items.length
        ? null
        : {
            type: "FeatureCollection",
            features: items.map((t) => ({
              type: "Feature",
              geometry: t.geometry,
              properties: {
                site_number: t.site_number,
                name: t.name,
              },
            })),
          }
    ),
  },
});
