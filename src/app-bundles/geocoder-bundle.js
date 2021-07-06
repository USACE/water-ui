import { transform } from "ol/proj";

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

const geocoderBundle = {
  name: "geocoder",

  getReducer() {
    const initialData = {
      shouldRegister: true,
      shouldHandleSelect: false,
      selectedItem: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (payload) {
        case "SEARCH_ITEM_SELECTED":
          if (
            payload.selected.provider &&
            payload.selected.provider === "geocoder"
          ) {
            return {
              ...state,
              shouldHandleSelect: true,
              selectedItem: payload.selected,
            };
          }
          return { ...state, ...payload };
        case "GEOCODER_REGISTERED":
        case "GEOCODER_HANDLED_SELECT":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  doGeocoderRegister:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "GEOCODER_REGISTERED",
        payload: { shouldRegister: false },
      });
      store.doSearchAddCollection({
        onFireSearch: store.doGeocoderFireSearch,
      });
    },

  doGeocoderHandleSelect:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "GEOCODER_HANDLED_SELECT",
        payload: { shouldHandleSelect: false },
      });
      const selectedItem = store.selectGeocoderLastSelected();
      if (selectedItem) {
        store.doSetView({
          center: selectedItem.center,
          zoom: selectedItem.zoom,
        });
      }
    },

  doGeocoderFireSearch:
    (callback) =>
    ({ dispatch, store, apiGet }) => {
      // Yeah, this is a hack, don't @ me
      // assumes something sets window.LIMIT_GEOCODER_COUNTRIES to an array of country codes
      // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
      // i.e. `var window.LIMIT_GEOCODER_COUNTRIES = ['us','as','mp','gu','pw','pr','vi','um'];`
      const countries = window.LIMIT_GEOCODER_COUNTRIES;
      let q = store.selectSearchQueryString();
      const mapProjection = store.selectMapProjection();
      const geoProjection = store.selectGeoProjection();
      let c = transform(store.selectViewCenter(), mapProjection, geoProjection);
      if (q.length < 2) return;
      q = encodeURIComponent(q);
      apiGet(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?proximity=${c.toString()}${
          countries && countries.length ? `&country=${countries.join(",")}` : ""
        }&access_token=pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA`,
        (err, body) => {
          if (err) return callback(err);

          const results = JSON.parse(body);

          return callback(
            null,
            results.features.map((r) => {
              let icon = "mdi mdi-map-marker";
              if (r.properties.maki) icon = `maki maki-${r.properties.maki}`;
              const z = zoomScales[r.place_type[0]] || 11;
              return {
                provider: "geocoder",
                displayName: r.place_name,
                place_type: r.place_type,
                iconClass: icon,
                center: r.center,
                zoom: z,
                geometry: r.geometry,
                properties: r.properties,
              };
            })
          );
        }
      );
    },

  selectGeocoderLastSelected: (state) => {
    return state.geocoder.selectedItem;
  },

  reactGeocoderShouldHandleSelect: (state) => {
    if (state.geocoder.shouldHandleSelect)
      return { actionCreator: "doGeocoderHandleSelect" };
  },

  reactGeocoderShouldRegister: (state) => {
    if (state.geocoder.shouldRegister)
      return { actionCreator: "doGeocoderRegister" };
  },
};

export default geocoderBundle;
