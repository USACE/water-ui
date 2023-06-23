import { useEffect, useState } from "react";
import { interpolateRdYlGn } from "d3-scale-chromatic";

export default function GeoJSON({ layerId, map, data, getDataFn }) {
  const [geojson, setGeojson] = useState(data);
  // make sure we account for data that's loading for a minute
  useEffect(() => {
    setGeojson(data);
  }, [data]);

  // get the data
  useEffect(() => {
    if (geojson) return;
    setGeojson(getDataFn());
  }, [geojson, getDataFn]);

  // render it on the map
  useEffect(() => {
    if (!map) return;
    if (!geojson) return;

    const src = map.getSource(layerId);
    if (src) {
      src.setData(geojson);
    } else {
      map.addSource(layerId, {
        type: "geojson",
        data: geojson,
      });
      map.addLayer({
        id: layerId,
        source: layerId,
        type: "circle",
        paint: {
          "circle-radius": 16,
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "pct_storage"],
            0,
            interpolateRdYlGn(0),
            0.2,
            interpolateRdYlGn(0.2),
            0.4,
            interpolateRdYlGn(0.4),
            0.6,
            interpolateRdYlGn(0.6),
            0.8,
            interpolateRdYlGn(0.8),
            1,
            interpolateRdYlGn(1),
          ],
          "circle-blur": 0.9,
        },
      });
    }
  }, [geojson, map, layerId]);

  return null;
}
