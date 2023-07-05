import React, { useEffect, useRef, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import maplibregl from 'maplibre-gl';
import BasemapControl from './maplibre-basemap-switcher';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-basemaps/lib/basemaps.css';
import clusterLayer from './layers';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

export default function Map({ controls, children, mapRef }) {
  const {
    doMapLocationSelectionUpdate,
    doUpdateUrl,
    providerByRoute: provider,
  } = useConnect(
    'doMapLocationSelectionUpdate',
    'doUpdateUrl',
    'selectProviderByRoute'
  );

  const mapEl = useRef();
  const [map, setMap] = useState();
  useEffect(() => {
    if (!mapEl.current) return;

    const map = new maplibregl.Map(
      {
        attributionControl: false,
        container: mapEl.current,
        style:
          'https://api.maptiler.com/maps/voyager/style.json?key=UYMc0uOxdLvOXIuWttnQ',
        center: [-86, 39],
        zoom: 4,
      },
      [mapEl.current]
    );

    if (controls.navigation) {
      const nav = new maplibregl.NavigationControl();
      map.addControl(nav, 'top-left');
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
        unit: 'imperial',
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
      map.addControl(new BasemapControl({ apiKey: '' }), 'bottom-left');
    }
    setMap(map);

    clusterLayer(
      map,
      'locations',
      `${apiUrl}/providers/${provider?.slug}/locations?fmt=geojson`,
      doUpdateUrl
    );

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'unclustered-point', function (e) {
      // map.flyTo({
      //   center: e.features[0].geometry.coordinates,
      // });
      const _provider = e.features[0].properties.provider;
      const slug = e.features[0].properties.slug;

      doMapLocationSelectionUpdate(_provider, slug);
      doUpdateUrl(`/map/${_provider}/locations/${slug}`);
    });

    //  // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    //  map.on('click', 'locations', function (e) {
    //   map.flyTo({
    //     center: e.features[0].geometry.coordinates,
    //   });
    // });

    // // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    // map.on('mouseenter', 'locations', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'locations', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    // // When a click event occurs on a feature in the places layer, open a popup at the
    // // location of the feature, with description HTML from its properties.
    // map.on('click', 'locations', (e) => {
    //   // Copy coordinates array.
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    //   const description = e.features[0].properties.public_name;
    //   const provider = e.features[0].properties.provider;
    //   const slug = e.features[0].properties.slug;

    //   // Ensure that if the map is zoomed out such that multiple
    //   // copies of the feature are visible, the popup appears
    //   // over the copy being pointed to.
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }
    //   console.log(coordinates);

    //   doMapLocationSelectionUpdate(provider, slug);

    //   doUpdateUrl(`/map/${provider}/locations/${slug}`);

    //   // new maplibregl.Popup()
    //   //   .setLngLat(coordinates)
    //   //   .setHTML(description)
    //   //   .addTo(map);
    // });

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
    doMapLocationSelectionUpdate,
    doUpdateUrl,
    provider,
  ]);

  let elements = React.Children.toArray(children);
  elements = elements.map((el) => {
    return React.cloneElement(el, { map: map });
  });
  return (
    <div
      ref={mapEl}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {elements}
    </div>
  );
}
