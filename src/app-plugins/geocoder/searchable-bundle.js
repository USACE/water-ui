import createSearchableBundle from "../../app-bundles/create-searchable-bundle";

const zoomScales = {
  region: 8,
  postcode: 11,
  district: 11,
  place: 12,
  locality: 12,
  neighborhood: 14,
  address: 19,
  poi: 19,
  "poi.landmark": 19,
};

export default createSearchableBundle({
  searchEntity: "geocoder",
  actionPrefix: "GEOCODER",
  doSearch:
    () =>
    ({ dispatch, store, apiGet }) => {
      dispatch({ type: "GEOCODER_SEARCH_START" });
      let q = store.selectSearchQuery();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 2) {
        dispatch({ type: "GEOCODER_SEARCH_FINISH", payload: [] });
        return;
      }
      apiGet(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          q
        )}.json?country=us&access_token=pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA`,
        (err, json) => {
          if (err) {
            dispatch({
              type: "GEOCODER_SEARCH_ERROR",
              payload: err,
            });
          } else {
            dispatch({
              type: "GEOCODER_SEARCH_FINISH",
              payload: json.features.map((f) => ({
                display_name: f.place_name,
                place_type: f.place_type,
                center: f.center,
                zoom: zoomScales[f.place_type[0]] || 11,
                geometry: f.geometry,
                properties: f.properties,
              })),
            });
          }
        }
      );
    },
});
