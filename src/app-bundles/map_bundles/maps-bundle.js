/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

import olMap from "ol/Map.js";
import View from "ol/View";
import ScaleBar from "ol/control/ScaleLine";
import { transform } from "ol/proj";
import { XYZ } from "ol/source";
import { Tile } from "ol/layer";

const actions = {
  MAPS_INITIALIZED: `MAPS_INITIALIZED`,
  MAPS_SHUTDOWN: `MAPS_SHUTDOWN`,
  MAPS_UPDATED: `MAPS_UPDATED`,
};

// Default Background Map

const tileLayerInfo = {
  id: "CartoDBPositron",
  name: "CartoDB Positron",
  url: "https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  attributions:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributionss">CartoDB</a>',
  maxZoom: 19,
};

const tileLayer = new Tile({
  source: new XYZ({
    url: tileLayerInfo.url,
    crossOrigin: true,
    attributions: tileLayerInfo.attributions,
    maxZoom: tileLayerInfo.maxZoom,
  }),
});

// Events
const onMoveEnd = (selectQueryObject, doUpdateQuery) => (evt) => {
  const map = evt.map;
  const view = map.getView();
  const [x, y] = view.getCenter();
  doUpdateQuery({
    ...selectQueryObject(),
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    zoom: Math.round(view.getZoom() * 100) / 100,
  });
};

const mapsBundle = {
  name: "maps",

  getReducer: () => {
    const initialData = {
      _shouldUpdateLayers: false,
      _layersUpdating: false,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "LAYER_UPDATED":
          return { ...state, _shouldUpdateLayers: true };
        case actions.MAPS_UPDATED:
        case actions.MAPS_INITIALIZED:
        case actions.MAPS_SHUTDOWN:
        case "MAPS_UPDATE_LAYERS_START":
        case "MAPS_UPDATE_LAYERS_FINISH":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  doMapsInitialize:
    (key, el, options) =>
    ({ dispatch, store }) => {
      const projection = store.selectProjectionMap();
      const layers = store.selectLayersItems();
      const map = new olMap({
        controls: [new ScaleBar({ units: "us" })],
        target: el,
        view: new View({
          projection: projection,
          center: (options && options.center) ||
            store.selectMapsUrlCenter() || [-11000000, 4600000],
          zoom: (options && options.zoom) || store.selectMapsUrlZoom() || 4,
        }),
        layers: [tileLayer, ...layers],
        ...options,
      });

      // Register Listeners
      map.on(
        "moveend",
        onMoveEnd(store.selectQueryObject, store.doUpdateQuery)
      );

      dispatch({
        type: actions.MAPS_INITIALIZED,
        payload: {
          [key]: map,
        },
      });
    },

  doMapsShutdown:
    (key) =>
    ({ dispatch, store }) => {
      const map = store.selectMapsObject()[key];

      // Unregister Listeners
      map.un("moveend", onMoveEnd(store.doUpdateQuery));

      dispatch({
        type: actions.MAPS_SHUTDOWN,
        payload: {
          [key]: null,
        },
      });
    },
  doMapsReproject:
    (epsg) =>
    ({ dispatch, store }) => {
      const m = store.selectMapsState().main;
      const v = m.getView();

      m.setView(
        new View({
          projection: epsg,
          zoom: 4,
          center: transform(v.getCenter(), v.getProjection(), epsg),
        })
      );
      dispatch({ type: "MAPS_UPDATED" });
    },
  doMapsUpdateLayers:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "MAPS_UPDATE_LAYERS_START",
        payload: { _shouldUpdateLayers: false, _layersUpdating: true },
      });
      const layers = store.selectLayersItems();
      const activeMaps = store.selectMapsActive();
      Object.values(activeMaps).forEach((m) => {
        // Remove All Layers Currently in Map
        m.getLayers()
          .getArray()
          .slice(1)
          .forEach((old) => {
            m.removeLayer(old);
          });
        layers.forEach((a) => {
          m.addLayer(a);
        });
      });
      dispatch({
        type: "MAPS_UPDATE_LAYERS_FINISH",
        payload: { _layersUpdating: false },
      });
    },
  selectMapsState: (state) => {
    return state.maps;
  },
  selectMapsShouldUpdateLayers: (state) => state.maps._shouldUpdateLayers,
  selectMapsLayersUpdating: (state) => state.maps._layersUpdating,
  selectMapsObject: createSelector("selectMapsState", (state) => {
    const items = {};
    Object.keys(state).forEach((key) => {
      if (key[0] !== "_") items[key] = state[key];
    });
    return items;
  }),

  selectMapsActive: createSelector("selectMapsObject", (obj) => {
    const active = {};
    Object.keys(obj).forEach((key) => {
      // If value of map key is not null, map is active
      if (obj[key]) {
        active[key] = obj[key];
      }
    });
    return active;
  }),
  selectMapsFlags: createSelector("selectMapsState", (state) => {
    const flags = {};
    Object.keys(state).forEach((key) => {
      if (key[0] === "_") flags[key] = state[key];
    });
    return flags;
  }),
  // Center Coordinate for Map Based on URL Parameters x=, y=
  selectMapsUrlCenter: createSelector("selectQueryObject", (obj) => {
    const { x, y } = obj;
    if (!x || !y) {
      return null;
    }
    return [parseFloat(x), parseFloat(y)];
  }),
  // Zoom for Map Based on URL Parameter zoom=
  selectMapsUrlZoom: createSelector("selectQueryObject", (obj) => {
    const zoom = obj.zoom;
    if (!zoom) {
      return null;
    }
    return parseFloat(zoom);
  }),
  reactMapsShouldUpdateLayers: createSelector(
    "selectMapsShouldUpdateLayers",
    "selectMapsLayersUpdating",
    (shouldUpdate, isUpdating) => {
      if (shouldUpdate && !isUpdating) {
        return { actionCreator: "doMapsUpdateLayers" };
      }
    }
  ),
};

export default mapsBundle;
