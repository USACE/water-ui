import { useEffect, useRef } from "react";
import { Map } from "../app-components/maplibre";

export default function MapHome() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) return null;
    const map = mapRef.current;
    map.on("load", () => {
      window.map = map;
    });
  }, []);
  return (
    <div className="relative mx-0 h-[500px] w-auto">
      <Map
        controls={{
          navigation: true,
          geolocation: true,
          scale: true,
          fullscreen: true,
          basemaps: true,
        }}
        mapRef={mapRef}
      ></Map>
    </div>
  );
}
