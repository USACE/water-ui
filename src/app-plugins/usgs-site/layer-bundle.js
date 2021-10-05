import { createSelector } from "redux-bundler";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
// import { Vector as VectorLayer } from "ol/layer";
// import { Style, Text, Fill, RegularShape } from "ol/style";
import WebGLPointsLayer from "ol/layer/WebGLPoints";

const config = {
  id: "usgsSites",
  name: "USGS Sites",
  zIndex: 5,
};

const usgsSiteLayerBundle = {
  name: "usgsSiteLayer",
  reducer: (
    state = {
      _isUpdating: false,
      _shouldUpdate: false,
      lastUpdate: null,
    },
    { type, payload }
  ) => {
    switch (type) {
      case "USGSSITE_FETCH_FINISHED":
        return {
          ...state,
          _shouldUpdate: true,
        };
      case "USGS_SITE_LAYER_UPDATE_START":
      case "USGS_SITE_LAYER_UPDATE_FINISH":
      case "USGS_SITE_LAYER_UPDATE_BAIL":
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  },
  doUsgsSiteLayerUpdate:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "USGS_SITE_LAYER_UPDATE_START",
        payload: { _shouldUpdate: false, _isUpdating: true },
      });

      const _g = store.selectUsgsSiteItemsGeoJSON();
      const vectorSource = new VectorSource({
        features: _g
          ? new GeoJSON().readFeatures(_g, {
              dataProjection: store.selectProjectionGeo(),
              featureProjection: store.selectProjectionMap(),
            })
          : null,
      });

      // const vectorLayer = new VectorLayer({
      //   id: config.id,
      //   source: vectorSource,
      //   style: (feature, resolution) =>
      //     new Style({
      //       image: new RegularShape({
      //         points: 4,
      //         radius: resolution < 300 ? 5 : 4,
      //         angle: Math.PI / 4,
      //         fill: new Fill({
      //           color: [0, 110, 78, 0.9],
      //         }),
      //         stroke: null,
      //       }),
      //       text: new Text({
      //         text: resolution < 400 ? feature.get("name") : "",
      //         textAlign: "start",
      //         offsetX: 3,
      //         offsetY: -3,
      //       }),
      //     }),
      //   declutter: true,
      // });
      const vectorLayer = new WebGLPointsLayer({
        id: config.id,
        source: vectorSource,
        style: {
          symbol: {
            symbolType: "square",
            size: 5,
            color: "rgba(0,110,78,0.6)",
          },
        },
      });

      // Set zIndex for Layer
      vectorLayer.setZIndex(config.zIndex);

      // Dispatch for other bundles listening
      dispatch({
        type: "LAYER_UPDATED",
        payload: { id: config.id, name: config.name, layer: vectorLayer },
      });

      dispatch({
        type: "USGS_SITE_LAYER_UPDATE_FINISH",
        payload: {
          _isUpdating: false,
          lastUpdate: new Date(),
        },
      });
    },
  selectUsgsSiteLayerShouldUpdate: (store) => store.usgsSiteLayer._shouldUpdate,
  selectUsgsSiteLayerIsUpdating: (store) => store.usgsSiteLayer._isUpdating,
  reactUsgsSiteLayerShouldUpdate: createSelector(
    "selectUsgsSiteLayerShouldUpdate",
    "selectUsgsSiteLayerIsUpdating",
    (shouldUpdate, isUpdating) => {
      if (shouldUpdate && !isUpdating) {
        return { actionCreator: "doUsgsSiteLayerUpdate" };
      }
    }
  ),
};

export default usgsSiteLayerBundle;
