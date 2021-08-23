import { createSelector } from "redux-bundler";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Style, Text, Fill } from "ol/style";

const locationLayerBundle = {
  name: "locationLayer",
  reducer: (
    state = {
      _isUpdating: false,
      _shouldUpdate: false,
      lastUpdate: null,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "SETTINGS_LOCATION_NAME_CHANGE":
      case "LOCATION_FETCH_FINISHED":
        return {
          ...state,
          _shouldUpdate: true,
        };
      case "LOCATION_LAYER_UPDATE_START":
      case "LOCATION_LAYER_UPDATE_FINISH":
      case "LOCATION_LAYER_UPDATE_BAIL":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doLocationLayerUpdate:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "LOCATION_LAYER_UPDATE_START",
        payload: { _shouldUpdate: false, _isUpdating: true },
      });

      // Get Setting; Location Name Preference
      const nameKey = store.selectSettingsLocationName();

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(
          store.selectLocationItemsGeoJSON(),
          {
            dataProjection: store.selectProjectionGeo(),
            featureProjection: store.selectProjectionMap(),
          }
        ),
      });

      const layerId = "locations";

      const vectorLayer = new VectorLayer({
        id: layerId,
        source: vectorSource,
        style: (feature, resolution) =>
          new Style({
            image: new CircleStyle({
              radius: resolution < 300 ? 6 : 4,
              fill: new Fill({
                color: [20, 184, 166, 0.9],
              }),
              stroke: null,
            }),
            text: new Text({
              text: resolution < 800 ? feature.get(nameKey) : "",
              textAlign: "start",
              offsetX: 3,
              offsetY: -3,
            }),
          }),
        declutter: false,
      });

      // Dispatch for other bundles listening
      dispatch({
        type: "LAYER_UPDATED",
        payload: { [layerId]: vectorLayer },
      });

      dispatch({
        type: "LOCATION_LAYER_UPDATE_FINISH",
        payload: {
          _isUpdating: false,
          lastUpdate: new Date(),
        },
      });
    },
  selectLocationLayerShouldUpdate: (store) => store.locationLayer._shouldUpdate,
  selectLocationLayerIsUpdating: (store) => store.locationLayer._isUpdating,
  reactLocationLayerShouldUpdate: createSelector(
    "selectLocationLayerShouldUpdate",
    "selectLocationLayerIsUpdating",
    (shouldUpdate, isUpdating) => {
      if (shouldUpdate && !isUpdating) {
        return { actionCreator: "doLocationLayerUpdate" };
      }
    }
  ),
};

export default locationLayerBundle;
