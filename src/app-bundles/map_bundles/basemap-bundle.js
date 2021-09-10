import { XYZ } from "ol/source";
import { Tile } from "ol/layer";
import { createSelector } from "redux-bundler";

const getXyzSource = ({ url, crossOrigin, attributions, maxZoom }) =>
  new XYZ({
    url: url,
    crossOrigin: crossOrigin,
    attributions: attributions,
    maxZoom: maxZoom,
  });

const getTileLayer = ({ source, visible, zIndex, opacity, maxzoom, minzoom }) =>
  new Tile({
    source: source,
    visible: visible || true,
    zIndex: zIndex || 0,
    opacity: opacity || 1,
    maxZoom: maxzoom,
    minZoom: minzoom,
  });

const basemapBundle = {
  name: "basemap",
  // persistActions: ["BASEMAP_CHANGED"],
  getReducer() {
    const initialData = {
      shouldInitialize: false,
      active: null,
      idx: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "BASEMAP_CHANGED":
        case "BASEMAP_INITIALIZE":
          return { ...state, ...payload };
        case "MAPS_INITIALIZED":
          return { ...state, shouldInitialize: true };
        case "MAPS_SHUTDOWN":
          return { ...state, active: null };
        default:
          return state;
      }
    };
  },
  doBasemapInitialize:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "BASEMAP_INITIALIZE",
        payload: { shouldInitialize: false },
      });
      const _active = store.selectBasemapActive();
      if (!_active) {
        store.doBasemapChange(0);
      }
    },
  doBasemapChange:
    (basemapIndex, mapKey = "main") =>
    ({ dispatch, store }) => {
      // Get Map
      const map = store.selectMapsObject()[mapKey];
      // Get JSON configuration for basemap to switch to
      const basemapList = store.selectBasemapList();
      const basemapConfig = basemapList[basemapIndex];
      // Get Active Basemap (before switch)
      let _active = store.selectBasemapActive();
      if (!_active) {
        // Create a new Layer
        _active = getTileLayer({});
      }
      map.removeLayer(_active);
      _active.setSource(getXyzSource(basemapConfig));
      map.getLayers().insertAt(0, _active);
      dispatch({
        type: "BASEMAP_CHANGED",
        payload: { active: _active, idx: basemapIndex },
      });
    },
  selectBasemapActive: (state) => {
    return state.basemap.active;
  },
  selectBasemapActiveIdx: (state) => {
    return state.basemap.idx;
  },
  selectBasemapActiveId: createSelector(
    "selectBasemapActiveIdx",
    "selectBasemapList",
    (idx, list) => idx && list[idx].id
  ),
  selectBasemapIsDark: createSelector(
    "selectBasemapActiveId",
    (id) => ["CartoDBDarkMatter", "MapBoxAerial"].indexOf(id) !== -1
  ),
  selectBasemapList: (state) => [
    {
      id: "CartoDBPositron",
      name: "CartoDB Positron",
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/CartoDBPositron.png`,
      url: "https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributionss">CartoDB</a>',
      maxZoom: 19,
    },
    {
      id: "CartoDBDarkMatter",
      name: "CartoDB Dark Matter",
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/CartoDBDarkMatter.png`,
      url: "https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributionss">CartoDB</a>',
      maxZoom: 19,
    },
    {
      id: "OpenStreetMap",
      name: "OpenStreetMap",
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/OpenStreetMap.png`,

      url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      maxZoom: 19,
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    {
      id: "MapBoxStreets",
      name: "MapBox Streets",
      // @todo; Create actual thumbnail of MapBoxStreets map for Basemap Selector
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/OpenStreetMap.png`,
      url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA",
      attributions:
        'Imagery from <a href="https://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      visible: false,
    },
    {
      id: "MapBoxAerial",
      name: "MapBox Aerial",
      // @todo; Create actual thumbnail of MapBoxAerial map for Basemap Selector
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/OpenStreetMap.png`,
      url: "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA",
      attributions:
        'Imagery from <a href="https://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    {
      id: "MapBoxOutdoor",
      name: "MapBox Outdoor",
      // @todo; Create actual thumbnail of MapBoxOutdoor map for Basemap Selector
      thumbnail: `${process.env.PUBLIC_URL}/basemap-thumbnails/OpenStreetMap.png`,
      url: "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA",
      attributions:
        'Imagery from <a href="https://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  ],
  reactBasemapShouldInitialize: (state) => {
    if (state.basemap.shouldInitialize)
      return { actionCreator: "doBasemapInitialize" };
  },
};

export default basemapBundle;
