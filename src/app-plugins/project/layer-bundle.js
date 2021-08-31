import { createSelector } from "redux-bundler";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Style, Text, Fill } from "ol/style";

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

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(
          store.selectProjectItemsGeoJSON(),
          {
            dataProjection: store.selectProjectionGeo(),
            featureProjection: store.selectProjectionMap(),
          }
        ),
      });

      const layerId = "projects";

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
