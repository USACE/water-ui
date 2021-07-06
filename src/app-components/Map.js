import React, { useEffect, useRef } from "react";
import { connect } from "redux-bundler-react";

import { XYZ } from "ol/source";
import { Tile } from "ol/layer";
import { fromLonLat } from "ol/proj";

const tileLayerInfo = {
  id: "CartoDBPositron",
  name: "CartoDB Positron",
  url: "https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  attributions:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributionss">CartoDB</a>',
  maxZoom: 19,
};

const Map = connect(
  "doMapsInitialize",
  "doMapsShutdown",
  ({ doMapsInitialize, doMapsShutdown, mapKey, options, height }) => {
    const ref = useRef();
    useEffect(() => {
      if (options && options.center) {
        options.center = fromLonLat(options.center);
      }
      const tileLayer = new Tile({
        source: new XYZ({
          url: tileLayerInfo.url,
          crossOrigin: true,
          attributions: tileLayerInfo.attributions,
          maxZoom: tileLayerInfo.maxZoom,
        }),
      });
      doMapsInitialize(mapKey, ref.current, {
        controls: [],
        layers: [tileLayer],
        ...options,
      });

      return () => doMapsShutdown(mapKey);
    }, [doMapsInitialize, doMapsShutdown, mapKey, options]);

    return height ? (
      <div style={{ height: height }} ref={ref} />
    ) : (
      <div className='absolute inset-0' ref={ref} />
    );
  }
);

export default Map;
