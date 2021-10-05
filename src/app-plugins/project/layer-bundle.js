import { createSelector } from "redux-bundler";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Style, Text, Fill } from "ol/style";

const config = {
  id: "projects",
  name: "USACE Projects",
  zIndex: 6,
};

const getStyleFn =
  (nameKey, darkMode = false) =>
  (feature, resolution) =>
    new Style({
      image: new CircleStyle({
        radius: resolution < 300 ? 6 : 5.5,
        fill: new Fill({
          color: "#7C3AED",
        }),
        stroke: null,
      }),
      text: new Text({
        text: resolution < 800 ? feature.get(nameKey) : "",
        textAlign: "start",
        offsetX: 6,
        offsetY: -6,
        // Tailwind CSS Colors; Cool Gray Family
        // https://tailwindcss.com/docs/customizing-colors
        fill: new Fill({ color: darkMode ? "#F9FAFB" : "#1F2937" }),
      }),
    });

const projectLayerBundle = {
  name: "projectLayer",
  reducer: (
    state = {
      _isUpdating: false,
      _shouldUpdate: false,
      lastUpdate: null,
    },
    { type, payload }
  ) => {
    switch (type) {
      // Change to dark basemap requires new layer style
      case "BASEMAP_CHANGED":
      case "SETTINGS_PROJECT_NAME_CHANGE":
      case "PROJECT_FETCH_FINISHED":
        return {
          ...state,
          _shouldUpdate: true,
        };
      case "PROJECT_LAYER_UPDATE_START":
      case "PROJECT_LAYER_UPDATE_FINISH":
      case "PROJECT_LAYER_UPDATE_BAIL":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doProjectLayerUpdate:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "PROJECT_LAYER_UPDATE_START",
        payload: { _shouldUpdate: false, _isUpdating: true },
      });

      // Get Setting; Location Name Preference
      const nameKey = store.selectSettingsLocationName();

      const _g = store.selectProjectItemsGeoJSON();
      const vectorSource = new VectorSource({
        features: _g
          ? new GeoJSON().readFeatures(_g, {
              dataProjection: store.selectProjectionGeo(),
              featureProjection: store.selectProjectionMap(),
            })
          : null,
      });

      // Style
      const basemapIsDark = store.selectBasemapIsDark();

      const vectorLayer = new VectorLayer({
        id: config.id,
        source: vectorSource,
        style: getStyleFn(nameKey, basemapIsDark),
        declutter: false,
      });

      vectorLayer.setZIndex(config.zIndex);

      // Dispatch for other bundles listening
      dispatch({
        type: "LAYER_UPDATED",
        payload: { id: config.id, name: config.name, layer: vectorLayer },
        // payload: { [config.id]: vectorLayer },
      });

      dispatch({
        type: "PROJECT_LAYER_UPDATE_FINISH",
        payload: {
          _isUpdating: false,
          lastUpdate: new Date(),
        },
      });
    },
  selectProjectLayerShouldUpdate: (store) => store.projectLayer._shouldUpdate,
  selectProjectLayerIsUpdating: (store) => store.projectLayer._isUpdating,
  reactProjectLayerShouldUpdate: createSelector(
    "selectProjectLayerShouldUpdate",
    "selectProjectLayerIsUpdating",
    (shouldUpdate, isUpdating) => {
      if (shouldUpdate && !isUpdating) {
        return { actionCreator: "doProjectLayerUpdate" };
      }
    }
  ),
};

export default projectLayerBundle;
