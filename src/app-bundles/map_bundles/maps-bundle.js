/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

import olMap from "ol/Map.js";
import View from "ol/View";
import ScaleBar from "ol/control/ScaleLine";
import { transform } from "ol/proj";

const actions = {
  MAPS_INITIALIZED: `MAPS_INITIALIZED`,
  MAPS_SHUTDOWN: `MAPS_SHUTDOWN`,
  MAPS_UPDATED: `MAPS_UPDATED`,
  MAPS_UPDATE_SIZE: `MAPS_UPDATE_SIZE`,
};

const mapsBundle = {
  name: "maps",

  getReducer: () => {
    const initialData = {
      _shouldUpdateSize: false,
      _shouldUpdateLayers: false,
      _layersUpdating: false,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "LAYER_UPDATED":
          return { ...state, _shouldUpdateLayers: true };
        case "PANELGROUP_UPDATE_WIDTHS":
          return { ...state, _shouldUpdateSize: true };
        case actions.MAPS_UPDATED:
        case actions.MAPS_INITIALIZED:
        case actions.MAPS_SHUTDOWN:
        case "MAPS_UPDATE_LAYERS_START":
        case "MAPS_UPDATE_LAYERS_FINISH":
        case "MAPS_UPDATE_SIZE":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  doMapsOnMoveEnd:
    (evt) =>
    ({ dispatch, store }) => {
      const map = evt.map;
      const view = map.getView();
      const [x, y] = view.getCenter();
      const zoom = view.getZoom();

      // Rounded values from current map state
      const xRound = Math.round(x * 100) / 100;
      const yRound = Math.round(y * 100) / 100;
      const zoomRound = Math.round(zoom * 100) / 100;
      const newQuery = { x: xRound, y: yRound, zoom: zoomRound };

      // If there is no selected provider; Always sync x,y,zoom query parameters w/ map state
      if (!store.selectRouteParams().provider) {
        store.doUpdateQuery({
          ...store.selectQueryObject(),
          ...newQuery,
        });
        return;
      } else {
      }
    },
  doMapsInitialize:
    (key, el, options) =>
    ({ dispatch, store }) => {
      const projection = store.selectProjectionMap();
      const layers = store.selectLayersItems();

      // Get Map Padding Here
      // @todo - revisit; would like to refactor so this logic is not present here
      // Putting the logic here feels like too tight of coupling between UI layout
      // and bundle logic.  Passing padding as an option to the map component (first alternative tried)
      // resulted in too many map renders, as map initialized/shutdown every time window resized (debounced)
      const padding = store.selectDetailPanelMapPadding();

      const map = new olMap({
        controls: [new ScaleBar({ units: "us" })],
        target: el,
        view: new View({
          projection: projection,
          center: (options && options.center) ||
            store.selectMapsUrlCenter() || [-11000000, 4600000],
          zoom: (options && options.zoom) || store.selectMapsUrlZoom() || 4,
          padding: (options && options.padding) || padding,
        }),
        layers: [...layers],
        ...options,
      });

      // Register Listeners
      map.on("moveend", store.doMapsOnMoveEnd);

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
      map.un("moveend", store.doMapsOnMoveEnd);

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
  doMapsUpdateSize:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "MAPS_UPDATE_SIZE",
        payload: { _shouldUpdateSize: false },
      });
      // Select Active Maps
      const activeMaps = store.selectMapsActive();
      Object.values(activeMaps).forEach((m) => {
        m.updateSize();
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
  selectMapsXYZoom: (state) => {
    const map = state.maps["main"];
    if (!map) {
      return null;
    }
    const view = map.getView();
    const [x, y] = view.getCenter();
    const zoom = view.getZoom();
    const xRound = Math.round(x * 100) / 100;
    const yRound = Math.round(y * 100) / 100;
    const zoomRound = Math.round(zoom * 100) / 100;
    return {
      x: xRound,
      y: yRound,
      zoom: zoomRound,
    };
  },
  reactMapsShouldUpdateLayers: createSelector(
    "selectMapsShouldUpdateLayers",
    "selectMapsLayersUpdating",
    (shouldUpdate, isUpdating) => {
      if (shouldUpdate && !isUpdating) {
        return { actionCreator: "doMapsUpdateLayers" };
      }
    }
  ),
  reactMapsShouldUpdateSize: (store) =>
    store.maps._shouldUpdateSize ? { actionCreator: "doMapsUpdateSize" } : null,
};

export default mapsBundle;
