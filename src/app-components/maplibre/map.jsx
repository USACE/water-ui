import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import BasemapControl from "./maplibre-basemap-switcher";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-basemaps/lib/basemaps.css";

export default function Map({ controls, children, mapRef }) {
  const mapEl = useRef();
  const [map, setMap] = useState();
  useEffect(() => {
    if (!mapEl.current) return;

    const map = new maplibregl.Map(
      {
        attributionControl: false,
        container: mapEl.current,
        style:
          "https://api.maptiler.com/maps/voyager/style.json?key=UYMc0uOxdLvOXIuWttnQ",
        center: [-96, 39],
        zoom: 5,
      },
      [mapEl.current]
    );

    if (controls.navigation) {
      const nav = new maplibregl.NavigationControl();
      map.addControl(nav, "top-left");
    }

    if (controls.geolocation) {
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
    }

    if (controls.scale) {
      const scale = new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: "imperial",
      });
      map.addControl(scale);
    }

    if (controls.fullscreen) {
      map.addControl(new maplibregl.FullscreenControl());
    }

    map.addControl(
      new maplibregl.AttributionControl({
        compact: true,
      })
    );

    if (controls.basemaps) {
      map.addControl(new BasemapControl({ apiKey: "" }), "bottom-right");
    }

    map.on("load", () => {
      setMap(map);
    });

    if (mapRef) {
      mapRef.current = map;
    }
  }, [
    controls.navigation,
    controls.geolocation,
    controls.scale,
    controls.fullscreen,
    controls.basemaps,
    mapRef,
  ]);

  let elements = React.Children.toArray(children);
  elements = elements.map((el) => {
    return React.cloneElement(el, { map: map });
  });
  return (
    <div
      ref={mapEl}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {elements}
    </div>
  );
}
