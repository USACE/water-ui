import React, { useEffect, useRef } from "react";
import { connect } from "redux-bundler-react";

import { fromLonLat } from "ol/proj";

const Map = connect(
  "doMapsInitialize",
  "doMapsShutdown",
  ({ doMapsInitialize, doMapsShutdown, mapKey, options, height }) => {
    const ref = useRef();
    useEffect(() => {
      if (options && options.center) {
        options.center = fromLonLat(options.center);
      }

      doMapsInitialize(mapKey, ref.current, {
        controls: [],
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
