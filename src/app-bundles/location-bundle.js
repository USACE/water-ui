import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "location",
  uid: "slug",
  prefetch: true,
  staleAfter: 3600000, //5min
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/locations?kind_id=460ea73b-c65e-4fc8-907a-6e6fd2907a99`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: ["URL_UPDATED"],
  urlParamSelectors: ["selectOfficeIdByRoute"],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: true,
  state: { _displayAll: false },
  addons: {
    doLocationToggleDisplayAll:
      () =>
      ({ dispatch }) => {
        dispatch({ type: "LOCATION_TOGGLE_DISPLAY_ALL" });
      },
    selectLocationByOfficeId: createSelector(
      "selectLocationItems",
      "selectOfficeItemsObjectById",
      (locations, officeObj) => {
        if (!Object.keys(officeObj).length) {
          return {};
        }
        const obj = {};
        locations.forEach((l) => {
          if (!obj.hasOwnProperty(l.office_id)) {
            obj[l.office_id] = [l];
          } else {
            obj[l.office_id].push(l);
          }
        });
        return obj;
      }
    ),
    selectLocationItemsActive: createSelector(
      "selectQueryObject",
      "selectLocationItemsObject",
      "selectOfficeByRoute",
      "selectLocationByOfficeId",
      (queryObj, locationObj, office, locationByOffice) => {
        // If ?location=<slug> in the query, single location selected
        if (queryObj && queryObj.location) {
          return locationObj[queryObj.location];
        }
        if (!locationByOffice || !Object.keys(locationByOffice).length) {
          return [];
        }
        // If selected office does not have any locations
        return office ? locationByOffice[office.id] || [] : [];
      }
    ),
    selectLocationDisplayAll: (state) => state.location._displayAll,
    selectLocationItemsGeoJSON: createSelector("selectLocationItems", (items) =>
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
    selectLocationCount: createSelector(
      "selectLocationItems",
      (items) => items.length
    ),
  },
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case "LOCATION_TOGGLE_DISPLAY_ALL":
        return { ...state, _displayAll: !state._displayAll };
      default:
        return state;
    }
  },
});
